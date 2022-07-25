import { Component } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormFieldConfig } from 'src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage {
  private formFieldConfigs: FormFieldConfig[] = [
    {
      fieldDisplay: 'Width (mm)',
      fieldName: 'width',
      fieldType: FormFieldType.INPUT_WHOLE_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Projection (mm)',
      fieldName: 'projection',
      fieldType: FormFieldType.INPUT_WHOLE_NUMBER,
      defaultValue: 0,
    },
  ];

  formConfig = {
    isInExpansionTable: false,
    fields: this.formFieldConfigs,
  };

  menuOptions = [{ display: 'Back', link: '' }];
  isSubmittable = false;
}
