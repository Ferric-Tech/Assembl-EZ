import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';

export interface PageConfig {
  header: string;
  subHeader: string;
}

export interface ProcessResultsPageConfig extends PageConfig {
  explainer: string;
  results: ProcessResult[];
}

export interface ProcessResult {
  description: string;
  resultType: ResultType;
  result: any;
}

export enum ResultType {
  NUMBER,
  DATE,
  LIST,
}
@Component({
  selector: 'app-view-lead-detail-screen',
  templateUrl: './view-lead-detail.screen.html',
  styleUrls: ['./view-lead-detail.screen.scss'],
})
export class ViewLeadDetailScreen implements OnInit {
  @Input() config = {} as ProcessResultsPageConfig;
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Back to leads',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW_ALL,
    },
  ];

  generalConfig = {} as PageConfig;
  resultsType = ResultType;

  constructor(public router: Router) {}

  ngOnInit() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
