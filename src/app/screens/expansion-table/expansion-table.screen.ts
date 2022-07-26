import { Component, Input } from '@angular/core';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';

@Component({
  selector: 'app-expansion-table-screen',
  templateUrl: './expansion-table.screen.html',
  styleUrls: ['./expansion-table.screen.scss'],
})
export class ExpansionTableScreen {
  @Input() expansionPanelConfig: ExpansionPanelConfig[] = [];

  contentType = ExpansionPanelContentType;
}
