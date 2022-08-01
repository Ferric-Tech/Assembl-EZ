import { Component, Input, OnInit } from '@angular/core';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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