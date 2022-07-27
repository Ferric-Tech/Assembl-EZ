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

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.PRODUCT_SELECT;
  expansionPanelConfig: ExpansionPanelConfig[] = [];
  quoteSpecs: ListConfig | undefined;
  quoteParams = {} as { productGroup: string; measurements: {} };

  private productGroupField = {
    fieldDisplay: 'Product Group:',
    fieldName: 'productGroup',
    fieldType: FormFieldType.SELECT,
    default: 0,
    options: [] as FormFieldOption[],
  };

  private productRangeField = {
    fieldDisplay: 'Product range:',
    fieldName: 'productRange',
    fieldType: FormFieldType.RADIO,
    default: 0,
    options: [
      { display: 'All', value: 1 },
      { display: 'Selected', value: 2 },
    ] as FormFieldOption[],
  };

  private productSelectField = {
    fieldDisplay: 'Products:',
    fieldName: 'productSelect',
    fieldType: FormFieldType.MULTI_SELECT,
    default: 0,
    options: [] as FormFieldOption[],
  };

  productSelectFormConfig: FormConfig = {
    formTitle: 'Production selection',
    isInExpansionTable: false,
    isDynamic: true,
    canProceed: false,
    fields: [this.productGroupField],
    proceedText: 'Proceed',
  };

  productParamsFormConfig: FormConfig = {
    formTitle: 'Provide product measurements',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    fields: [
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
    ],
    proceedText: 'Generate quotes',
  };

  menuOptions = [{ display: 'Back', link: '' }];
  isSubmittable = false;

  ngOnInit() {
    let productGroups: ProductGroup = TestProductList;
    let productsGroupsForSelection: FormFieldOption[] = [];
    Object.keys(productGroups).forEach((product) => {
      productsGroupsForSelection.push({ display: product, value: product });
    });
    this.productSelectFormConfig.fields[0].options = productsGroupsForSelection;
  }

  onProductSelectFormChange(formValue: any) {
    if (this.productSelectFormConfig.fields.length === 1) {
      if (parseInt(formValue['productGroup']) != 0) {
        this.productSelectFormConfig.fields.push(this.productRangeField);
      } else {
        this.productSelectFormConfig.fields = [this.productGroupField];
      }
      return;
    }

    if (this.productSelectFormConfig.fields.length === 2) {
      if (parseInt(formValue['productRange']) === 2) {
        this.getProductsFromProductGroup(formValue['productGroup']);
        this.productSelectFormConfig.fields.push(this.productSelectField);
        this.productSelectFormConfig.canProceed = false;
      } else {
        this.productSelectFormConfig.fields = [
          this.productGroupField,
          this.productRangeField,
        ];
        this.productSelectFormConfig.canProceed = true;
      }
      return;
    }

    if (this.productSelectFormConfig.fields.length === 3) {
      if (parseInt(formValue['productRange']) === 1) {
        this.productSelectFormConfig.fields = [
          this.productGroupField,
          this.productRangeField,
        ];
        this.productSelectFormConfig.canProceed = true;
        return;
      }
      this.productSelectFormConfig.canProceed = false;
    }
  }

  private getProductsFromProductGroup(productGroupName: string) {
    let productGroups: ProductGroup = TestProductList;
    let productGroup = productGroups[productGroupName];
    let productOptions: FormFieldOption[] = [];
    productGroup.forEach((product: Product) => {
      productOptions.push({
        display: product.productName,
        value: product.productName,
      });
    });
    this.productSelectField.options = productOptions;
  }

  onProductSelectFormSubmitted(formValue: any) {
    this.quoteParams = formValue;
    console.log(this.quoteParams);
    this.currentViewState = ViewState.PRODUCT_MEASUREMENTS;
  }

  processQuote(formValue: { [key: string]: string }) {
    let measurements: { [key: string]: string } = {};
    Object.keys(formValue).forEach((key) => {
      measurements[key] = formValue[key];
    });
    measurements['squareMeters'] = this.calcSqm(formValue).toString();
    this.setQuoteSpecs(formValue, measurements['squareMeters']);
    this.setExpansionPanelsConfigs();
    this.currentViewState = ViewState.RESULTS;
  }

  private calcSqm(formValue: { [key: string]: string }) {
    return (
      (parseInt(formValue['projection']) * parseInt(formValue['width'])) /
      1000000
    );
  }

  private setQuoteSpecs(
    formValue: { [key: string]: string },
    squareMeters: string
  ) {
    this.quoteSpecs = {
      isInExpansionTable: false,
      title: 'Quote specs',
      headers: [],
      lines: [
        ['Width', formValue['width']],
        ['Projection', formValue['projection']],
        [
          'Square meters',
          parseInt(squareMeters).toFixed(2).toString() + ' sqm',
        ],
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
