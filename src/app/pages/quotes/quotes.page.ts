import { Component, OnInit } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
  FormFieldOption,
} from 'src/app/interfaces/form-screen.interface';
import { QuotePageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';
import {
  Product,
  ProductGroup,
  TestProductList,
} from 'src/app/test-data/products.data';
import { QuoteResponse, QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.PRODUCT_SELECT;
  expansionPanelConfig: ExpansionPanelConfig[] = [];
  quoteSpecs: ListConfig | undefined;
  quoteParams = {} as any;

  quoteParametersFormConfig: FormConfig = {
    formTitle: 'Quote parameters',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: true,
    fields: [
      {
        fieldDisplay: 'Present non-required components',
        fieldName: 'presentNonRequiredComponents',
        fieldType: FormFieldType.CHECKBOX,
        defaultValue: false,
      },
    ],
    proceedText: 'Generate quotes',
  };

  menuOptions = [{ display: 'Back', link: '' }];
  isSubmittable = false;

  constructor(private quotesService: QuotesService) {}

  onProductSelectFormSubmitted(formValue: any) {
    this.quoteParams = formValue;
    this.currentViewState = ViewState.PRODUCT_MEASUREMENTS;
  }

  onProductMeasurementFormSubmitted(formValue: { [key: string]: string }) {
    this.quoteParams = { ...this.quoteParams, ...formValue };
    this.quoteParams['area'] = this.calcArea(formValue).toString();
    this.quoteParams['perimeter'] = this.calcPerimeter(formValue).toString();
    this.currentViewState = ViewState.QUOTE_PARAMETERS;
  }

  onQuoteParametersFormSubmitted(formValue: { [key: string]: string }) {
    this.quoteParams = { ...this.quoteParams, ...formValue };
    let quoteResponse: QuoteResponse = this.quotesService.generateQuote(
      this.quoteParams
    );
    this.setQuoteSpecs(this.quoteParams);
    this.setExpansionPanelsConfigs(quoteResponse);
    this.currentViewState = ViewState.RESULTS;
  }

  private calcPerimeter(formValue: { [key: string]: string }) {
    return (
      ((parseInt(formValue['projection']) + parseInt(formValue['width'])) * 2) /
      1000
    );
  }

  private calcArea(formValue: { [key: string]: string }) {
    return (
      (parseInt(formValue['projection']) * parseInt(formValue['width'])) /
      1000000
    );
  }

  private setQuoteSpecs(measurements: { [key: string]: string }) {
    this.quoteSpecs = {
      isInExpansionTable: false,
      title: 'Quote specs',
      headers: [
        { widthFactor: 4, content: '' },
        { widthFactor: 2, content: '' },
      ],
      lines: [
        ['Width (mm)', measurements['width']],
        ['Projection (mm)', measurements['projection']],
        ['Area (Sqm)', parseInt(measurements['area']).toFixed(2).toString()],
        [
          'Perimeter (m)',
          parseInt(measurements['perimeter']).toFixed(2).toString(),
        ],
      ],
    };
  }

  private setExpansionPanelsConfigs(quoteResponse: QuoteResponse) {
    quoteResponse.quotedProducts.forEach((product) => {
      let listOfComponents: string[][] = [];
      product.components.forEach((component) => {
        listOfComponents.push([
          component.componentName,
          component.componentQuantity.toFixed(2).toString(),
          component.componentTotalPrice.toFixed(2).toString(),
        ]);
      });
      this.expansionPanelConfig.push({
        title: product.productName,
        description: product.price.toFixed(2).toString(),
        contentType: ExpansionPanelContentType.LIST,
        listContent: {
          isInExpansionTable: true,
          title: 'Bill of materials',
          headers: [
            { widthFactor: 9, content: 'Component' },
            { widthFactor: 3, content: 'Qty' },
            { widthFactor: 4, content: 'Total' },
          ],
          lines: listOfComponents,
        },
      });
    });
  }
}
