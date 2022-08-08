import { Component } from '@angular/core';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { EmailsService } from 'app/services/emails.service';
import { AgentProfile, AgentService } from 'app/services/agent.service';
import { LoadingService } from 'app/services/loading.service';

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
  currentValues: { [key: string]: any } = {};

  constructor(
    private emailsService: EmailsService,
    private agentService: AgentService,
    private loadingService: LoadingService
  ) {
    this.getUpdatedAgents();
  }

  async onAgentAdded(formValue: { [key: string]: string }) {
    const agent = formValue as unknown as AgentProfile;
    agent.contactNumber = '+27' + parseInt(agent.contactNumber).toString();
    this.loadingService.setLoading();
    await this.agentService.addAgent(agent).then(
      (success) => {
        this.emailsService.newAgentEmail();
        this.loadingService.cancelLoading();
      },
      (error) => {
        this.loadingService.cancelLoading();
      }
    );
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
    this.currentViewState = ViewState.VIEW;
  }

  onAgentClicked(index: number) {
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

  onRequestToEdit() {
    this.currentValues = this.agentProfile;
    this.currentViewState = ViewState.EDIT;
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
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
