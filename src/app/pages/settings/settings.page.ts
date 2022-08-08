import { Component } from '@angular/core';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  currentViewState = ViewState.MENU;
  viewState = ViewState;
}
