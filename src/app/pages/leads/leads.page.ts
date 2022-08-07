import { Component } from '@angular/core';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import {
  NotificationConfig,
  NotificationType,
  Notification,
} from 'app/modals/notifications/notifications.modal';
import {
  Warning,
  WarningConfig,
  WarningType,
} from 'app/modals/warning/warning.modal';
import { LeadsService } from 'app/services/leads.service';

@Component({
  selector: 'app-leads-page',
  templateUrl: './leads.page.html',
  styleUrls: ['./leads.page.scss'],
})
export class LeadsPage {
  viewState = ViewState;
  currentViewState = ViewState.MENU;

  leads: { [key: string]: any } = {};
  lead: { [key: string]: string } = {};

  isWarning = false;
  warnigConfig: WarningConfig | undefined;
  isNotifying = false;
  notificationConfig: NotificationConfig | undefined;

  constructor(private leadService: LeadsService) {}

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadService.addLead(formValue).then(
      async (success) => {
        this.notificationConfig = {
          type: NotificationType.LEAD,
          notification: Notification.LEAD_ADDED,
        };
        this.isNotifying = true;
        await this.geUpdatedLeads();
        this.currentViewState = ViewState.VIEW_ALL;
      },
      (error) => {
        this.warnigConfig = {
          type: WarningType.LEADS,
          warning: Warning.UNABLE_TO_ADD,
        };
        this.isWarning = true;
      }
    );
  }

  onLeadClicked(index: number) {
    let leadRefs = Object.values(this.leads);
    this.lead = leadRefs[index];
    this.currentViewState = ViewState.VIEW_LEAD;
  }

  async onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.VIEW_ALL: {
        await this.geUpdatedLeads();
      }
    }
    this.currentViewState = viewState;
  }

  private async geUpdatedLeads(): Promise<void> {
    await this.leadService.getLeads().then(
      async (success) => {
        this.leads = success;
      },
      (error) => {}
    );
  }
}
