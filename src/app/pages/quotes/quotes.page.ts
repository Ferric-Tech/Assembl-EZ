import { Component } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormFieldConfig } from 'src/app/interfaces/form-screen.interface';
import { QuotePageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.PARAMETERS;

  expansionPanelConfig: ExpansionPanelConfig[] = [];
  quoteSpecs: ListConfig | undefined;

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

  processQuote(formValue: { width: string; projection: string }) {
    let squareMeters = this.calcSqm(formValue);
    this.setQuoteSpecs(formValue, squareMeters);
    this.setExpansionPanelsConfigs();
    this.currentViewState = ViewState.RESULTS;
  }

  private calcSqm(formValue: { width: string; projection: string }) {
    return (
      (parseInt(formValue.projection) * parseInt(formValue.width)) / 1000000
    );
  }

  private setQuoteSpecs(
    formValue: { width: string; projection: string },
    squareMeters: number
  ) {
    this.quoteSpecs = {
      isInExpansionTable: false,
      title: 'Quote specs',
      headers: [],
      lines: [
        ['Width', formValue.width],
        ['Projection', formValue.projection],
        ['Square meters', squareMeters.toFixed(2).toString() + ' sqm'],
      ],
    };
  }

  private setExpansionPanelsConfigs() {
    this.expansionPanelConfig = [
      {
        title: 'Alu Lourve',
        description: 'R22500',
        contentType: ExpansionPanelContentType.LIST,
        listContent: {
          isInExpansionTable: true,
          title: 'Bill of materials',
          headers: [
            { widthFactor: 3, content: 'Component' },
            { widthFactor: 1, content: 'Qty' },
          ],
          lines: [
            ['Lourve panels', '8'],
            ['Lourve carriers', '1'],
            ['Lourve beams', '4'],
            ['Gearbox', '1'],
            ['Gearbox  crankhandel', '1'],
          ],
        },
      },
      {
        title: 'Alu IBR',
        description: 'R12500',
        contentType: ExpansionPanelContentType.LIST,
        listContent: {
          isInExpansionTable: true,
          title: 'Bill of materials',
          headers: [
            { widthFactor: 3, content: 'Component' },
            { widthFactor: 1, content: 'Qty' },
          ],
          lines: [
            ['IBR sheets', '5'],
            ['IBR beams', '2'],
          ],
        },
      },
    ];
  }
}
