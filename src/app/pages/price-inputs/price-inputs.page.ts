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
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Lourve Carrier',
      fieldName: 'lourveCarrier',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Lourve Beam',
      fieldName: 'lourveBeam',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'IBR Sheet',
      fieldName: 'ibrSheet',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'IBR Beam',
      fieldName: 'ibrBeam',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Gutter',
      fieldName: 'gutter',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
  ];

  private gearboxFormFieldConfigs: FormFieldConfig[] = [
    {
      fieldDisplay: 'Gearbox',
      fieldName: 'gearbox',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Crank handle',
      fieldName: 'crankHandle',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
  ];

  private labourFormFieldConfigs: FormFieldConfig[] = [
    {
      fieldDisplay: 'Labour minimum ',
      fieldName: 'labourMinimum',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
    {
      fieldDisplay: 'Labour hourly rate ',
      fieldName: 'labourHourRate',
      fieldType: FormFieldType.INPUT,
      defaultValue: 0,
    },
  ];

  accordionConfig: ExpansionPanelConfig[] = [
    {
      title: 'Aluminium',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: false,
        fields: this.materialFormFieldConfigs,
      },
    },
    {
      title: 'Chromedek',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: false,
        fields: this.materialFormFieldConfigs,
      },
    },
    {
      title: 'Gearboxes',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: false,
        fields: this.gearboxFormFieldConfigs,
      },
    },
    {
      title: 'Labour',
      contentType: ExpansionPanelContentType.FORM,
      formContent: {
        isInExpansionTable: false,
        fields: this.labourFormFieldConfigs,
      },
    },
  ];

  menuOptions = [{ display: 'Back', link: '' }];
}
