import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AuthenticationService } from 'app/services/authentication-service.service';
import { MainPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Leads',
      optionType: MenuOptionType.URL,
      link: 'leads',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Quotes',
      optionType: MenuOptionType.URL,
      link: 'quotes',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Products',
      optionType: MenuOptionType.URL,
      link: 'products',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Agents',
      optionType: MenuOptionType.URL,
      link: 'agents',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Settings',
      optionType: MenuOptionType.URL,
      link: 'settings',
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Sign out',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.SIGN_OUT,
    },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.SIGN_OUT: {
        this.authenticationService.signOut();
        this.router.navigate(['sign-in']);
      }
    }
  }
}
