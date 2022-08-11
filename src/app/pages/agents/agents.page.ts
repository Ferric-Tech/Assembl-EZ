import { Component } from '@angular/core';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { EmailsService } from 'app/services/emails.service';
import { AgentProfile, AgentService } from 'app/services/agent.service';
import { LoadingService } from 'app/services/loading.service';
import { LeadsService } from 'app/services/leads.service';
import {
  Notification,
  NotificationConfig,
  NotificationType,
} from 'app/modals/notifications/notifications.modal';
import { ClientProfileService } from 'app/services/client-profile.service';
import {
  Warning,
  WarningConfig,
  WarningType,
} from 'app/modals/warning/warning.modal';

@Component({
  selector: 'app-agents-page',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage {
  viewState = ViewState;
  currentViewState = ViewState.VIEW;
  agents: { [key: string]: any } = {};
  agentProfile = {} as AgentProfile;
  agentLeads: { [key: string]: any } = {};
  currentValues: { [key: string]: any } = {};
  notificationConfig: NotificationConfig | undefined;
  isNotifying = false;
  warnigConfig: WarningConfig | undefined;
  isWarning = false;

  constructor(
    private emailsService: EmailsService,
    private agentService: AgentService,
    private leadsService: LeadsService,
    private loadingService: LoadingService,
    private profileService: ClientProfileService
  ) {
    this.getUpdatedAgents();
  }

  async onAgentAdded(formValue: { [key: string]: string }) {
    const agent = formValue as unknown as AgentProfile;
    this.agentService.getAgentDefaultPassword().then((password) => {
      agent.password = password;
    });
    agent.contactNumber = '+27' + parseInt(agent.contactNumber).toString();
    this.loadingService.setLoading();
    await this.agentService.addAgent(agent).then(
      (success) => {
        // this.emailsService.newAgentEmail();
        this.loadingService.cancelLoading();
      },
      (error) => {
        this.loadingService.cancelLoading();
      }
    );
    await this.getUpdatedAgents();
    this.currentViewState = ViewState.VIEW;
  }

  async onAgentEdited(formValue: { [key: string]: string }) {
    delete formValue['password'];
    const agent = formValue as unknown as AgentProfile;
    agent.contactNumber = '+27' + parseInt(agent.contactNumber).toString();
    agent.id = this.agentProfile.id;
    this.loadingService.setLoading();
    await this.agentService.editAgent(agent).then(
      (success) => {
        this.loadingService.cancelLoading();
      },
      (error) => {
        this.loadingService.cancelLoading();
      }
    );
    await this.getUpdatedAgents();
    this.currentViewState = ViewState.VIEW;
  }

  async onAgentClicked(index: number) {
    this.setAgentProfile(index);
    await this.setAgentLeads();
    this.currentViewState = ViewState.VIEW_AGENT;
  }

  onRequestToEdit() {
    this.currentValues = this.agentProfile;
    this.currentViewState = ViewState.EDIT;
  }

  onViewStateSelected(viewState: number) {
    if (viewState === ViewState.ADD) {
      this.loadingService.setLoading();
      this.agentService.getAgentDefaultPassword().then(
        (agentDefaultPassword) => {
          this.loadingService.cancelLoading();
          if (!agentDefaultPassword) {
            this.notificationConfig = {
              type: NotificationType.REQUIRES_AGENT_PASSWORD,
              notification: Notification.REQUIRES_AGENT_PASSWORD,
            };
            this.isNotifying = true;
            this.currentViewState = ViewState.SET_AGENT_PASSWORD;
          } else {
            this.currentViewState = viewState;
          }
        },
        (error) => {
          this.loadingService.cancelLoading();
        }
      );
    } else {
      this.currentViewState = viewState;
    }
  }

  onAgentPasswordSet(formValue: { [key: string]: string }) {
    this.loadingService.setLoading();
    this.profileService
      .updateUserProfile({
        agentDefaultPassword: formValue['newPassword'],
      })
      .then(
        async (success) => {
          this.loadingService.cancelLoading();
          this.notificationConfig = {
            type: NotificationType.CHANGE_PASSWORD,
            notification: Notification.AGENT_PASSWORD_CHANGED,
          };
          this.isNotifying = true;
          this.currentViewState = ViewState.ADD;
        },
        async (error) => {
          this.loadingService.cancelLoading();
        }
      );
  }

  onPasswordMismatch() {
    this.warnigConfig = {
      type: WarningType.PASSWORD_CHANGE,
      warning: Warning.MISMATCHED_PASSWORD,
    };
    this.isWarning = true;
  }

  onNotificationProceed() {
    this.isNotifying = false;
  }

  private setAgentProfile(index: number) {
    let agentRefs = Object.values(this.agents);
    this.agentProfile = agentRefs[index];
    Object.keys(this.agents).forEach((key) => {
      if (
        JSON.stringify(this.agents[key as keyof AgentProfile]) ===
        JSON.stringify(agentRefs[index])
      ) {
        this.agentProfile.id = key;
      }
    });
    this.currentViewState = ViewState.VIEW_AGENT;
  }

  private async setAgentLeads() {
    this.agentLeads = {};
    let leads: { [key: string]: any } = await this.leadsService.getLeads();
    Object.keys(leads).forEach((key) => {
      if (leads[key]['assignedTo'] === this.agentProfile.id) {
        this.agentLeads[key] = leads[key];
      }
    });
  }

  private async getUpdatedAgents(): Promise<void> {
    await this.agentService.getAgents().then(
      async (agents) => {
        this.agents = agents;
      },
      (error) => {}
    );
  }
}
