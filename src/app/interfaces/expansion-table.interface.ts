import { ExpansionPanelContentType } from '../enums/expansion-table.enum';
import { FormConfig } from './form-screen.interface';

export interface ExpansionPanelConfig {
  title: string;
  description?: string;
  contentType: ExpansionPanelContentType;
  formContent: FormConfig;
}
