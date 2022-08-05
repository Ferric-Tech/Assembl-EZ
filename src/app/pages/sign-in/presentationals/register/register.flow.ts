import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegisterScreenViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-register-flow',
  templateUrl: './register.flow.html',
  styleUrls: ['./register.flow.scss'],
})
export class RegisterFlow {
  @Output() registrationComplete = new EventEmitter<{
    [key: string]: string;
  }>();
  @Output() basicDetailsFormSubmitted = new EventEmitter<{
    [key: string]: string;
  }>();
  @Output() isPasswordMismatched = new EventEmitter<void>();

  viewState = ViewState;
  currentViewState = ViewState.BUSINESS;
  registrationFormValue = {};

  onPasswordMismatch() {
    this.isPasswordMismatched.emit();
  }

  onBasicDetailsSubmitted(formValue: { [key: string]: string }) {
    this.registrationFormValue = formValue;
    this.basicDetailsFormSubmitted.emit(formValue);
    this.currentViewState = ViewState.BUSINESS;
  }

  onBusinessDetailsSubmitted(formValue: { [key: string]: string }) {
    this.registrationFormValue = {
      ...this.registrationFormValue,
      ...formValue,
    };
    this.currentViewState = ViewState.CONTACT;
  }

  onContactDetailsSubmitted(formValue: { [key: string]: string }) {
    this.registrationFormValue = {
      ...this.registrationFormValue,
      ...formValue,
    };
    // this.registrationComplete.emit(this.registrationFormValue);
    this.currentViewState = ViewState.SUCCESS;
  }
}
