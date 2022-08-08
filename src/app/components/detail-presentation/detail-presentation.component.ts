import { Component, Input, OnInit } from '@angular/core';
import { DetailPresentationConfig } from 'app/interfaces/detail-presentation-component';

@Component({
  selector: 'app-detail-presentation-component',
  templateUrl: './detail-presentation.component.html',
  styleUrls: ['./detail-presentation.component.scss'],
})
export class DetailPresentationComponent implements OnInit {
  @Input() config: DetailPresentationConfig = { title: '', lines: [] };

  constructor() {}

  ngOnInit(): void {}
}
