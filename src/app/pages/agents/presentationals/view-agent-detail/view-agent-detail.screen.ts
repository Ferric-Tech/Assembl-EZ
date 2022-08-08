import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { DetailPresentationConfig } from 'app/interfaces/detail-presentation-component';
import { ExpansionPanelConfig } from 'app/interfaces/expansion-table.interface';
import { ExpansionPanelContentType } from 'app/enums/expansion-table.enum';

@Component({
  selector: 'app-view-agent-detail-screen',
  templateUrl: './view-agent-detail.screen.html',
  styleUrls: ['./view-agent-detail.screen.scss'],
})
export class ViewAgentDetailScreen {
  @Input() agentProfile: { [key: string]: string } = {};
  @Input() agentLeads: { [key: string]: any } = {};
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to agent list',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW,
    },
  ];

  agentDetailsConfig = {
    title: '',
    lines: [],
  } as DetailPresentationConfig;

  leadsExpansionPanelConfig: ExpansionPanelConfig[] = [
    {
      title: 'Leads',
      contentType: ExpansionPanelContentType.LIST,
      listContent: {
        title: 'There are no leads currently assigned to this agent',
        headers: [
          { content: 'Client', widthFactor: 1 },
          { content: 'Status', widthFactor: 1 },
        ],
        isInExpansionTable: true,
        lines: [],
      },
    },
  ];

  ngOnInit() {
    this.agentDetailsConfig.title =
      this.agentProfile['firstName'] + ' ' + this.agentProfile['lastName'];

    this.agentDetailsConfig.lines.push(
      {
        header: 'Email',
        detail: this.agentProfile['email'],
        oneliner: true,
      },
      {
        header: 'Contact number',
        detail: this.agentProfile['contactNumber'],
        oneliner: true,
      }
    );
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
