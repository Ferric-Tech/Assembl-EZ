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

  leads: any;
  lead: { [key: string]: string } = {};

  isWarning = false;
  warnigConfig: WarningConfig | undefined;
  isNotifying = false;
  notificationConfig: NotificationConfig | undefined;

  constructor(private leadService: LeadsService) {}

  async ngOnInit() {
    await this.getLeads();
  }

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadService.addLead(formValue).then(
      (success) => {
        this.currentViewState = ViewState.VIEW_ALL;
        this.notificationConfig = {
          type: NotificationType.LEAD,
          notification: Notification.LEAD_ADDED,
        };
        this.isNotifying = true;
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
    this.lead = this.leads[index]['data'];
    this.currentViewState = ViewState.VIEW_LEAD;
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
  }

  private async getLeads(): Promise<void> {
    this.leads = await this.leadService.getLeads();
  }
}
