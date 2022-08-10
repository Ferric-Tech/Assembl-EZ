import { Component, EventEmitter, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-passwords-menu-screen',
  templateUrl: './passwords-menu.screen.html',
  styleUrls: ['./passwords-menu.screen.scss'],
})
export class PasswordsMenuScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Change personal password',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.EDIT_PASSWORD,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'New agents default password',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.PASSWORDS_MENU,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to settings menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
