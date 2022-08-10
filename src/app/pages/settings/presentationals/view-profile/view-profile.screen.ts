import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpansionPanelContentType } from 'app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'app/interfaces/expansion-table.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-view-profile-screen',
  templateUrl: './view-profile.screen.html',
  styleUrls: ['./view-profile.screen.scss'],
})
export class ViewProfileScreen implements OnInit {
  @Input() profile: { [key: string]: any } = {};
  @Output() viewStateSelected = new EventEmitter<number>();

  expansionPanelConfig: ExpansionPanelConfig[] = [];

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Back to settigs menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.profile);
    this.setUpScreen();
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }

  private setUpScreen() {
    this.addBasics();
  }

  private addBasics() {
    let basics = {
      title: 'Basics',
      contentType: ExpansionPanelContentType.DETAIL,
      detailPresentationContent: {
        title: '',
        inExpansionPanel: true,
        lines: [
          {
            header: 'First name',
            detail: this.profile['firstName'],
            oneliner: true,
          },
          {
            header: 'Last name',
            detail: this.profile['lastName'],
            oneliner: true,
          },
          {
            header: 'Email',
            detail: this.profile['email'],
            oneliner: true,
          },
          {
            header: 'Contact number',
            detail: this.profile['contactNumber'],
            oneliner: true,
          },
        ],
      },
    };
    this.expansionPanelConfig.push(basics);
  }
}
