import { FormFieldType } from '../enums/form.eum';

export interface FormConfig {
  fieldName: string;
  fieldDisplay: string;
  fieldType: FormFieldType;
  defaultValue: number;
}
