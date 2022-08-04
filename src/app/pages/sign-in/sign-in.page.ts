import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  SignInDetails,
} from 'app/services/authentication-service.service';
import { SignInPageViewState as ViewState } from 'app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { ErrorHandlingService } from 'app/services/error-handling.service';
import {
  Warning,
  WarningConfig,
  WarningType,
} from 'app/modals/warning/warning.modal';
import {
  Notification,
  NotificationConfig,
  NotificationType,
} from 'app/modals/notifications/notifications.modal';
import { DataManagementService } from 'app/services/data-management.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  viewState = ViewState;
  currentViewState = ViewState.SIGN_IN;
  menuOptions: MenuOption[] = [];

  isWarning = false;
  warnigConfig: WarningConfig | undefined;
  isNotifying = false;
  notificationConfig: NotificationConfig | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private dataManagementService: DataManagementService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.authenticationService
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['']);
          return;
        }
      });
    this.setMenuOptions();
  }

  async onSignIn(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    await this.authenticationService.userSignIn(signInDetails).then(
      (success) => {
        this.router.navigate(['']);
        this.dataManagementService.getClientData().then((response) => {
          console.log(response);
        });
      },
      (error) => {
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        this.isWarning = true;
      }
    );
  }

  async registerUser(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    await this.authenticationService.userRegistration(signInDetails).then(
      (success) => {
        delete formValue['password'];
        delete formValue['confirmPassword'];
        this.authenticationService.updateUserProfile(formValue);
      },
      (error) => {
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        if (this.warnigConfig.warning === Warning.INVALID_EMAIL) {
          this.warnigConfig.type = WarningType.REGISTER;
        }
        this.isWarning = true;
      }
    );
  }

  onRegisterPasswordMismatch() {
    this.warnigConfig = {
      type: WarningType.REGISTER,
      warning: Warning.MISMATCHED_PASSWORD,
    };
    this.isWarning = true;
  }

  async onForgotPasswordSubmit(formValue: { [key: string]: string }) {
    let email = formValue['email'];
    await this.authenticationService.resetPassword(email).then(
      (success) => {
        this.notificationConfig = {
          type: NotificationType.FORGOT_PASSWORD,
          notification: Notification.RESET_PASSWORD_EMAIL_SENT,
        };
        this.isNotifying = true;
        this.currentViewState = ViewState.SIGN_IN;
        this.setMenuOptions();
      },
      (error) => {
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        this.isWarning = true;
      }
    );
  }

  onViewStateSelected(viewState: ViewState) {
    this.currentViewState = viewState;
    this.setMenuOptions();
  }

  private setMenuOptions() {
    switch (this.currentViewState) {
      case ViewState.SIGN_IN: {
        this.menuOptions = [
          {
            style: MenuOptionStyle.SECONDARY,
            display: `I'm a new user`,
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.REGISTER,
          },
          {
            style: MenuOptionStyle.SECONDARY,
            display: `Forgot password`,
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.FORGOT_PASSWORD,
          },
        ];
        break;
      }
      case ViewState.REGISTER:
      case ViewState.FORGOT_PASSWORD: {
        this.menuOptions = [
          {
            style: MenuOptionStyle.SECONDARY,
            display: 'Back to Sign in',
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.SIGN_IN,
          },
        ];
      }
    }
  }
}
