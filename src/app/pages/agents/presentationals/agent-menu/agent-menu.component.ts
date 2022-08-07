import { Component, EventEmitter, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-agent-menu',
  templateUrl: './agent-menu.component.html',
  styleUrls: ['./agent-menu.component.scss'],
})
export class AgentMenuComponent {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'View agents',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Add agent',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.ADD,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
      link: '',
    },
  ];

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
