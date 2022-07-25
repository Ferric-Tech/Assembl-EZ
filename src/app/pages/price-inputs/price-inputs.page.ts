import { Component } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormConfig } from 'src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-price-inputs-page',
  templateUrl: './price-inputs.page.html',
  styleUrls: ['./price-inputs.page.scss'],
})
export class PriceInputsPage {
  formConfigs: FormConfig[] = [
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
  menuOptions = [{ display: 'Back', link: '' }];
}
