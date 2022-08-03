import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum NotificationType {
  FORGOT_PASSWORD,
}

export enum Notification {
  RESET_PASSWORD_EMAIL_SENT,
}

export interface NotificationConfig {
  type: NotificationType;
  notification: Notification;
}

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications.modal.html',
  styleUrls: ['./notifications.modal.scss'],
})
export class NotificationsModal implements OnInit {
  @Input() notificationConfig: NotificationConfig | undefined;
  @Output() proceed: EventEmitter<void> = new EventEmitter();

  header = '';
  body = '';
  proceedButtonText = '';

  ngOnInit(): void {
    this.setHeader();
    this.setBody();
    this.setButtons();
  }

  onConfirmClick() {
    this.proceed.emit();
  }

  private setHeader() {
    switch (this.notificationConfig?.type) {
      case NotificationType.FORGOT_PASSWORD: {
        this.header = 'Password reset email sent';
        return;
      }
    }
  }

  private setBody() {
    switch (this.notificationConfig?.notification) {
      case Notification.RESET_PASSWORD_EMAIL_SENT: {
        this.body =
          'An email has been sent to the email provided, \
          please check that email for the link to have your \
          email reset';
        return;
      }
    }
  }

  private setButtons() {
    switch (this.notificationConfig?.type) {
      case NotificationType.FORGOT_PASSWORD: {
        this.proceedButtonText = 'Understood';
        return;
      }
    }
  }
}
