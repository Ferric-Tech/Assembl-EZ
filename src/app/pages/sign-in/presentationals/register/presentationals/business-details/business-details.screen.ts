import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
} from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-business-details-screen',
  templateUrl: './business-details.screen.html',
  styleUrls: ['./business-details.screen.scss'],
})
export class BusinessDetailsScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  formStage = 1;
  selectedOpertateAs = 0;

  opertateAsField: FormFieldConfig = {
    fieldDisplay: 'How do you operate',
    fieldName: 'entityType',
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
    fieldDisplay: 'Trading name',
    fieldName: 'tradingName',
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
    fieldDisplay: 'Trading and legam names differ',
    fieldName: 'tradingAndLegalNameDiffer',
    fieldType: FormFieldType.CHECKBOX,
    defaultValue: false,
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
        if (this.isEntityTypeAsChanged(formValue['entityType'])) {
          this.setFormStage2(formValue);
        }
        return;
      }
      case 3: {
        if (this.isEntityTypeAsChanged(formValue['entityType'])) {
          this.setFormStage2(formValue);
        }
        if (formValue['tradingAndLegalNameDiffer']) {
          this.businessDetailsFormConfig.fields.push(this.tradingAsField);
        }
        return;
      }
      case 4: {
        if (this.isEntityTypeAsChanged(formValue['entityType'])) {
          this.setFormStage2(formValue);
        }
        if (!formValue['tradingAndLegalNameDiffer']) {
          this.businessDetailsFormConfig.fields.pop();
        }
      }
    }
  }

  private isEntityTypeAsChanged(currentValue: string) {
    return parseInt(currentValue) != this.selectedOpertateAs;
  }

  private setFormStage2(formValue: { [key: string]: string }) {
    this.selectedOpertateAs = parseInt(formValue['entityType']);
    this.businessDetailsFormConfig.fields = [this.opertateAsField];
    this.businessDetailsFormConfig.fields[0].defaultValue = parseInt(
      formValue['entityType']
    );

    if (parseInt(formValue['entityType']) === 1) {
      this.businessDetailsFormConfig.fields.push(this.tradingAsField);
    }
    if (parseInt(formValue['entityType']) === 2) {
      this.businessDetailsFormConfig.fields.push(
        this.legalNameField,
        this.tradingUnderLegalNameField
      );
    }
  }
}