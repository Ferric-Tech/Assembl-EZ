import { Component, Input } from '@angular/core';
import { ExpansionPanelContentType } from 'app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'app/interfaces/expansion-table.interface';

@Component({
  selector: 'app-expansion-table-component',
  templateUrl: './expansion-table.component.html',
  styleUrls: ['./expansion-table.component.scss'],
})
export class ExpansionTableComponent {
  @Input() expansionPanelConfig: ExpansionPanelConfig[] = [];

  contentType = ExpansionPanelContentType;
}
