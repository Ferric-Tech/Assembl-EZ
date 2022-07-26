import { Component, Input } from '@angular/core';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list.screen.html',
  styleUrls: ['./list.screen.scss'],
})
export class ListScreen {
  @Input() listConfig: ListConfig = {
    isInExpansionTable: false,
    headers: [],
    lines: [],
  };
}
