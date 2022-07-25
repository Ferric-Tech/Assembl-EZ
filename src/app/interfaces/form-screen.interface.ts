import { FormFieldType } from '../enums/form.eum';

export interface FormConfig {
  fields: FormFieldConfig[];
  isInExpansionTable: boolean;
}

export interface FormFieldConfig {
  fieldName: string;
  fieldDisplay: string;
  fieldType: FormFieldType;
  defaultValue: number;
}
