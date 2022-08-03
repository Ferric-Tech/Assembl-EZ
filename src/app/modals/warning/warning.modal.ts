import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum WarningType {
  SIGN_IN,
  REGISTER,
}

export enum Warning {
  INVALID_EMAIL,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  EMAIL_ALREADY_EXISTS,
  WEAK_PASSWORD,
}

export enum WarningButtonOption {
  NONE,
  BOTH,
  ONLY_PROCEED,
  ONLY_CANCEL,
}

export interface WarningConfig {
  type: WarningType;
  warning: Warning;
}

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning.modal.html',
  styleUrls: ['./warning.modal.scss'],
})
export class WarningsModal implements OnInit {
  @Input() warningConfig: WarningConfig | undefined;
  @Output() proceed: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  header = '';
  body = '';
  proceedButtonText = '';
  cancelButtonText = '';

  ngOnInit(): void {
    this.setHeader();
    this.setBody();
    this.setButtons();
  }

  // Callbacks for call to actions
  onConfirmClick() {
    this.proceed.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  private setHeader() {
    switch (this.warningConfig?.type) {
      case WarningType.SIGN_IN: {
        this.header = 'Unable to sign in';
        return;
      }
      case WarningType.REGISTER: {
        this.header = 'Unable to register user';
        return;
      }
    }
  }

  private setBody() {
    switch (this.warningConfig?.warning) {
      case Warning.EMAIL_ALREADY_EXISTS: {
        this.body =
          'It seems your email is already in our system, \
        please return to the sign in page and sign in. If you have \
        forgotten your password, please select the "Forgot Password" \
        option below';
        return;
      }
      case Warning.INVALID_EMAIL: {
        this.body =
          'The email you have entered does not appear to be \
        valid, please enter your email address';
        return;
      }
      case Warning.USER_NOT_FOUND: {
        this.body =
          'It seems the email you have entered does not exsist \
        on our systems, please re-check the email you have entered. If \
        you are a new user, please click on the register option below \
        to register for a new account';
        return;
      }
      case Warning.WRONG_PASSWORD: {
        this.body =
          'The password you have entered is incorrect, please \
        re-try';
        return;
      }
      case Warning.WEAK_PASSWORD: {
        this.body =
          'The password you have entered is considered week, please enter \
          a stronger password at least 6 charaters log';
        return;
      }
    }
  }

  private setButtons() {
    switch (this.warningConfig?.type) {
      case WarningType.REGISTER:
      case WarningType.SIGN_IN: {
        this.proceedButtonText = 'Understood';
        this.cancelButtonText = '';
        return;
      }
    }
  }
}
