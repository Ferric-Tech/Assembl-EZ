import { Component } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';
import { MainPageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { Router } from '@angular/router';

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
        this.authenticationService.SignOut();
        this.router.navigate(['sign-in']);
      }
    }
  }
}
