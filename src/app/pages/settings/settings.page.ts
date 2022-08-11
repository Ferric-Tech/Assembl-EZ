import { Component } from '@angular/core';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import {
  Notification,
  NotificationConfig,
  NotificationType,
} from 'app/modals/notifications/notifications.modal';
import {
  Warning,
  WarningConfig,
  WarningType,
} from 'app/modals/warning/warning.modal';
import { AuthenticationService } from 'app/services/authentication-service.service';
import { ClientProfileService } from 'app/services/client-profile.service';
import { ErrorHandlingService } from 'app/services/error-handling.service';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  currentViewState = ViewState.MENU;
  viewState = ViewState;
  profile: { [key: string]: any } = {};
  warnigConfig: WarningConfig | undefined;
  isWarning = false;
  notificationConfig: NotificationConfig | undefined;
  isNotifying = false;

  constructor(
    private profileService: ClientProfileService,
    private loadingService: LoadingService,
    private authService: AuthenticationService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  onProfileUpdated(formValue: { [key: string]: string }) {
    this.loadingService.setLoading('Updating profile');
    this.profileService.updateUserProfile(formValue).then(
      async (success) => {
        this.loadingService.cancelLoading();
        this.notificationConfig = {
          type: NotificationType.PROFILE_UPDATED,
          notification: Notification.PROFILE_UPDATED,
        };
        this.isNotifying = true;
        this.onViewStateSelected(ViewState.VIEW_PROFILE);
      },
      async (error) => {
        this.loadingService.cancelLoading();
      }
    );
  }

  onPersonalPasswordChange(formValue: { [key: string]: string }) {
    this.loadingService.setLoading('Updating password');
    this.authService
      .updatePassword(formValue['newPassword'], formValue['oldPassword'])
      .then(
        async (success) => {
          this.loadingService.cancelLoading();
          this.notificationConfig = {
            type: NotificationType.CHANGE_PASSWORD,
            notification: Notification.PERSONAL_PASSWORD_CHANGED,
          };
          this.isNotifying = true;
          this.onViewStateSelected(ViewState.PASSWORDS_MENU);
        },
        async (error) => {
          this.loadingService.cancelLoading();
          this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
          this.isWarning = true;
        }
      );
  }

  onAgentPasswordChange(formValue: { [key: string]: string }) {
    this.loadingService.setLoading('Updating password');
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
          this.onViewStateSelected(ViewState.PASSWORDS_MENU);
        },
        async (error) => {
          this.loadingService.cancelLoading();
        }
      );
  }

  onUpdateCancelled() {
    this.onViewStateSelected(ViewState.VIEW_PROFILE);
  }

  async onViewStateSelected(viewState: number) {
    await this.getUpdatedProfile();
    this.currentViewState = viewState;
  }

  private async getUpdatedProfile(): Promise<void> {
    await this.profileService.getUserProfile().then(
      async (profile) => {
        this.profile = profile;
      },
      (error) => {}
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
}
