import { ExpansionPanelContentType } from '../enums/expansion-table.enum';
import { FormConfig } from './form-screen.interface';
import { ListConfig } from './list-screen.interface';

export interface ExpansionPanelConfig {
  title: string;
  description?: string;
  contentType: ExpansionPanelContentType;
  formContent?: FormConfig;
  listContent?: ListConfig;
}
