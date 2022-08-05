import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
} from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-contact-details-screen',
  templateUrl: './contact-details.screen.html',
  styleUrls: ['./contact-details.screen.scss'],
})
export class ContactDetailsScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  contactDetailsFormConfig = {} as FormConfig;
  private defaultContactDetailsFormConfig: FormConfig = {
    formTitle:
      'Now that we know about your businsess, we need to get the contact details for your busiess',
    isInExpansionTable: false,
    isDynamic: true,
    canProceed: false,
    fields: [
      {
        fieldName: 'groupTitleCompany',
        fieldDisplay: 'Company contacts',
        fieldType: FormFieldType.FIELD_GROUP_TITLE,
      },
      {
        fieldDisplay: 'Email',
        fieldName: 'companyEmail',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Contact number',
        fieldName: 'companyContactNumber',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Website',
        fieldName: 'companyWebsite',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldName: 'groupPrimaryContact',
        fieldDisplay: 'Primary contact person',
        fieldType: FormFieldType.FIELD_GROUP_TITLE,
      },
      {
        fieldDisplay: 'Make me primary contact',
        fieldName: 'isPrimaryContact',
        fieldType: FormFieldType.CHECKBOX,
        defaultValue: true,
      },
    ],
    proceedText: 'Proceed',
  };

  private primaryContactFields: FormFieldConfig[] = [
    {
      fieldDisplay: 'First name',
      fieldName: 'primaryContactFirstName',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: '',
    },
    {
      fieldDisplay: 'Last name',
      fieldName: 'primaryContactLastName',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: '',
    },
    {
      fieldDisplay: 'Email',
      fieldName: 'primaryContactEmail',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: '',
    },
    {
      fieldDisplay: 'ContactNumber',
      fieldName: 'primaryContactContactumber',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: '',
    },
  ];

  ngOnInit() {
    this.contactDetailsFormConfig = this.defaultContactDetailsFormConfig;
  }

  onContacDetailsForChanged(formValue: { [key: string]: string }) {
    let isDefaultForm = this.contactDetailsFormConfig.fields.length === 6;
    if (isDefaultForm && !formValue['isPrimaryContact']) {
      this.contactDetailsFormConfig.fields =
        this.contactDetailsFormConfig.fields.concat(this.primaryContactFields);
    }
    if (!isDefaultForm && formValue['isPrimaryContact']) {
      for (let i = 1; i < 5; i++) {
        this.contactDetailsFormConfig.fields.pop();
      }
    }
  }

  onContactDetailsFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
