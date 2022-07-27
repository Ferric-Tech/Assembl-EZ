import { FormFieldType } from '../enums/form.eum';

export interface FormConfig {
  formTitle: string;
  fields: FormFieldConfig[];
  isInExpansionTable: boolean;
  proceedText: string;
}

export interface FormFieldConfig {
  fieldName: string;
  fieldDisplay: string;
  fieldType: FormFieldType;
  defaultValue?: number;
  options?: FormFieldOption[];
}

export interface FormFieldOption {
  display: string;
  value: number | string;
}
