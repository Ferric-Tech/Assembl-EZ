import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { DetailPresentationConfig } from 'app/interfaces/detail-presentation-component';

@Component({
  selector: 'app-view-agent-detail-screen',
  templateUrl: './view-agent-detail.screen.html',
  styleUrls: ['./view-agent-detail.screen.scss'],
})
export class ViewAgentDetailScreen {
  @Input() agent: { [key: string]: string } = {};
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

  ngOnInit() {
    this.agentDetailsConfig.title =
      this.agent['firstName'] + ' ' + this.agent['lastName'];

    this.agentDetailsConfig.lines.push(
      {
        header: 'Email',
        detail: this.agent['email'],
        oneliner: true,
      },
      {
        header: 'Contact number',
        detail: this.agent['contactNumber'],
        oneliner: true,
      }
    );
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
