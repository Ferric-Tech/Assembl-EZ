import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListConfig } from 'app/interfaces/list-screen.interface';
import { MenuOption } from 'app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-view-leads-screen',
  templateUrl: './view-leads.screen.html',
  styleUrls: ['./view-leads.screen.scss'],
})
export class ViewLeadsScreen implements OnInit {
  @Input() leads: { id: string; data: { [key: string]: string } }[] = [];
  @Output() viewStateSelected = new EventEmitter<number>();

  leadListConfig: ListConfig = {
    isInExpansionTable: false,
    title: '',
    headers: [],
    lines: [],
  };
  menuOptions: MenuOption[] = [];

  ngOnInit() {
    this.setleadListConfig();
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }

  private setleadListConfig() {
    this.leadListConfig.headers.push(
      {
        widthFactor: 3,
        content: 'Name',
      },
      {
        widthFactor: 2,
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
