import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
} from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  formStage = 1;
  selectedOpertateAs = 0;

  opertateAsField: FormFieldConfig = {
    fieldDisplay: 'How do you operate',
    fieldName: 'opertateAs',
    fieldType: FormFieldType.RADIO,
    options: [
      {
        display: 'As a sole proprietor',
        value: 1,
      },
      {
        display: 'As a registered entity',
        value: 2,
      },
    ],
    defaultValue: 0,
  };

  tradingAsField: FormFieldConfig = {
    fieldDisplay: 'Trading as',
    fieldName: 'tradingAs',
    fieldType: FormFieldType.INPUT_GENERAL,
    defaultValue: '',
  };

  legalNameField: FormFieldConfig = {
    fieldDisplay: 'Legal name',
    fieldName: 'legalName',
    fieldType: FormFieldType.INPUT_GENERAL,
    defaultValue: '',
  };

  tradingUnderLegalNameField: FormFieldConfig = {
    fieldDisplay: 'Trading name same as legal"',
    fieldName: 'tradingUnderLegalName',
    fieldType: FormFieldType.CHECKBOX,
    defaultValue: true,
  };

  businessDetailsFormConfig: FormConfig = {
    formTitle:
      'Great! You have been registered on our platform. Let find out a little more about your business',
    isInExpansionTable: false,
    isDynamic: true,
    canProceed: false,
    fields: [this.opertateAsField],
    proceedText: 'Proceed',
  };

  onBusinessDetailsFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onBusinessDetailsForChanged(formValue: { [key: string]: string }) {
    switch (this.businessDetailsFormConfig.fields.length) {
      case 1: {
        this.setFormStage2(formValue);
        return;
      }
      case 2: {
        if (this.isOpertateAsChanged(formValue['opertateAs'])) {
          this.setFormStage2(formValue);
        }
        return;
      }
      case 3: {
        if (this.isOpertateAsChanged(formValue['opertateAs'])) {
          this.setFormStage2(formValue);
        }
        if (!formValue['tradingUnderLegalName']) {
          this.businessDetailsFormConfig.fields.push(this.tradingAsField);
        }
        return;
      }
      case 4: {
        if (this.isOpertateAsChanged(formValue['opertateAs'])) {
          this.setFormStage2(formValue);
        }
        if (formValue['tradingUnderLegalName']) {
          this.businessDetailsFormConfig.fields.pop();
        }
      }
    }
  }

  isOpertateAsChanged(currentValue: string) {
    return parseInt(currentValue) != this.selectedOpertateAs;
  }

  setFormStage2(formValue: { [key: string]: string }) {
    this.selectedOpertateAs = parseInt(formValue['opertateAs']);
    this.businessDetailsFormConfig.fields = [this.opertateAsField];
    this.businessDetailsFormConfig.fields[0].defaultValue = parseInt(
      formValue['opertateAs']
    );

    if (parseInt(formValue['opertateAs']) === 1) {
      this.businessDetailsFormConfig.fields.push(this.tradingAsField);
    }
    if (parseInt(formValue['opertateAs']) === 2) {
      this.businessDetailsFormConfig.fields.push(
        this.legalNameField,
        this.tradingUnderLegalNameField
      );
    }
  }
}
