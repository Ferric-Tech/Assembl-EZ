import { Component, EventEmitter, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-settings-menu-screen',
  templateUrl: './settings-menu.screen.html',
  styleUrls: ['./settings-menu.screen.scss'],
})
export class SettingsMenuScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'View profile',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.PROFILE,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Passwords',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.PASSWORDS,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
      link: '',
    },
  ];

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
