import { Component } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
} from 'src/app/interfaces/form-screen.interface';
import { QuotePageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.PARAMETERS;

  expansionPanelConfig: ExpansionPanelConfig[] = [];

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

  processQuote(formValue: any) {
    this.expansionPanelConfig = [
      {
        title: 'Alu Lourve',
        description: 'R22500',
        contentType: ExpansionPanelContentType.LIST,
        formContent: { isInExpansionTable: true } as FormConfig,
      },
      {
        title: 'Alu IBR',
        description: 'R12500',
        contentType: ExpansionPanelContentType.LIST,
        formContent: { isInExpansionTable: true } as FormConfig,
      },
    ];
    this.currentViewState = ViewState.RESULTS;
  }
}
