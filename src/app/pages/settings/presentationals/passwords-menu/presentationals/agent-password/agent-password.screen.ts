import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-agent-password-screen',
  templateUrl: './agent-password.screen.html',
  styleUrls: ['./agent-password.screen.scss'],
})
export class AgentPasswordScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to passwords menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.PASSWORDS_MENU,
    },
  ];

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
