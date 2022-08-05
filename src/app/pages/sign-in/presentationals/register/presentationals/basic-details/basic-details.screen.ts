import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-basic-details-screen',
  templateUrl: './basic-details.screen.html',
  styleUrls: ['./basic-details.screen.scss'],
})
export class BasicDetailsComponent {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() isPasswordMismatched = new EventEmitter<void>();

  registerFormConfig: FormConfig = {
    formTitle:
      'Regisering is a quick easy three-step process, \
      lets start by gettig your basic details',
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
        fieldDisplay: 'Contact number',
        fieldName: 'contactNumber',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Password',
        fieldName: 'password',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Confirm password',
        fieldName: 'confirmPassword',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
    ],
    proceedText: 'Proceed',
  };

  onRegisterFormSubmitted(formValue: { [key: string]: string }) {
    formValue['password'] === formValue['confirmPassword']
      ? this.formSubmitted.emit(formValue)
      : this.isPasswordMismatched.emit();
  }
}
