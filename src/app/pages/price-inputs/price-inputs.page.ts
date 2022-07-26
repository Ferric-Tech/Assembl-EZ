import { Component } from '@angular/core';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { FormFieldType } from 'src/app/enums/form.eum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';
import {
  FormConfig,
  FormFieldConfig,
} from 'src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-price-inputs-page',
  templateUrl: './price-inputs.page.html',
  styleUrls: ['./price-inputs.page.scss'],
})
export class PriceInputsPage {
  private materialFormFieldConfigs: FormFieldConfig[] = [
    {
      fieldDisplay: 'Lourve Panel',
      fieldName: 'lourvePanel',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Lourve Carrier',
      fieldName: 'lourveCarrier',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Lourve Beam',
      fieldName: 'lourveBeam',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'IBR Sheet',
      fieldName: 'ibrSheet',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'IBR Beam',
      fieldName: 'ibrBeam',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Gutter',
      fieldName: 'gutter',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
  ];

  private gearboxFormFieldConfigs: FormFieldConfig[] = [
    {
      fieldDisplay: 'Gearbox',
      fieldName: 'gearbox',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Crank handle',
      fieldName: 'crankHandle',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
  ];

  private labourFormFieldConfigs: FormFieldConfig[] = [
    {
      fieldDisplay: 'Labour minimum ',
      fieldName: 'labourMinimum',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Labour hourly rate ',
      fieldName: 'labourHourRate',
      fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
      defaultValue: 0,
    },
  ];

  expansionPanelConfig: ExpansionPanelConfig[] = [
    {
      title: 'Aluminium',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: true,
        fields: this.materialFormFieldConfigs,
      },
    },
    {
      title: 'Chromedek',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: true,
        fields: this.materialFormFieldConfigs,
      },
    },
    {
      title: 'Gearboxes',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: true,
        fields: this.gearboxFormFieldConfigs,
      },
    },
    {
      title: 'Labour',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: true,
        fields: this.labourFormFieldConfigs,
      },
    },
  ];

  menuOptions = [{ display: 'Back', link: '' }];
}
