import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register.screen.html',
  styleUrls: ['./register.screen.scss'],
})
export class RegisterScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  registerFormConfig: FormConfig = {
    formTitle: '',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    fields: [
      {
        fieldDisplay: 'First name',
        fieldName: 'firstName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Last name',
        fieldName: 'lastName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Email',
        fieldName: 'email',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Password',
        fieldName: 'password',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Confirm password',
        fieldName: 'confirmPassword',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
    ],
    proceedText: 'Register',
  };

  onRegisterFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
