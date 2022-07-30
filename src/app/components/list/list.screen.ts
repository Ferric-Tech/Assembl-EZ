import { Component, Input, OnInit } from '@angular/core';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list.screen.html',
  styleUrls: ['./list.screen.scss'],
})
export class ListScreen implements OnInit {
  @Input() listConfig: ListConfig = {
    isInExpansionTable: false,
    title: '',
    headers: [],
    lines: [],
  };

  columnWidths: number[] = [];

  ngOnInit() {
    this.setColumnWidths();
  }

  private setColumnWidths() {
    let total = 0;
    this.listConfig.headers.forEach((header) => {
      total = total + header.widthFactor;
    });
    this.listConfig.headers.forEach((header) => {
      this.columnWidths.push((header.widthFactor / total) * 100);
    });
  }
}
