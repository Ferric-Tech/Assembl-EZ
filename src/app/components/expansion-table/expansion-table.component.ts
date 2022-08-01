import { Component, Input } from '@angular/core';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';

@Component({
  selector: 'app-expansion-table-component',
  templateUrl: './expansion-table.component.html',
  styleUrls: ['./expansion-table.component.scss'],
})
export class ExpansionTableComponent {
  @Input() expansionPanelConfig: ExpansionPanelConfig[] = [];

  contentType = ExpansionPanelContentType;
}
