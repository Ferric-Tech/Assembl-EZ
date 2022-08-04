import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum NotificationType {
  FORGOT_PASSWORD,
  LEAD,
}

export enum Notification {
  RESET_PASSWORD_EMAIL_SENT,
  LEAD_ADDED,
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
      case NotificationType.LEAD: {
        this.header = 'Lead added';
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
      case Notification.LEAD_ADDED: {
        this.body = '';
        return;
      }
    }
  }

  private setButtons() {
    switch (this.notificationConfig?.type) {
      case NotificationType.FORGOT_PASSWORD:
      case NotificationType.LEAD: {
        this.proceedButtonText = 'Understood';
        return;
      }
    }
  }
}
