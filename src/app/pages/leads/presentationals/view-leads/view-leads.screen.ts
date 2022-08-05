import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListConfig } from 'app/interfaces/list-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-view-leads-screen',
  templateUrl: './view-leads.screen.html',
  styleUrls: ['./view-leads.screen.scss'],
})
export class ViewLeadsScreen implements OnInit {
  @Input() leads: { id: string; data: { [key: string]: string } }[] = [];
  @Output() viewStateSelected = new EventEmitter<number>();
  @Output() leadClicked = new EventEmitter<number>();

  leadListConfig: ListConfig = {
    isInExpansionTable: false,
    title: '',
    headers: [],
    lines: [],
  };
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Back to lead menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  ngOnInit() {
    this.setleadListConfig();
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }

  onLeadClicked(index: number) {
    this.leadClicked.emit(index);
  }

  private setleadListConfig() {
    this.leadListConfig.headers.push(
      {
        widthFactor: 1,
        content: 'Name',
      },
      {
        widthFactor: 1,
        content: 'Email',
      }
    );

    this.leads.forEach((lead) => {
      let leadListItem: string[] = [];
      leadListItem.push(lead.data['name']);
      leadListItem.push(lead.data['email']);
      this.leadListConfig.lines.push(leadListItem);
    });
  }
}