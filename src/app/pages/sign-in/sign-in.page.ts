import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  SignInDetails,
} from 'src/app/services/authentication-service.service';
import { SignInPageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  viewState = ViewState;
  currentViewState = ViewState.SIGN_IN;
  menuOptions: MenuOption[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.authenticationService
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['']);
          return;
        }
      });
    this.setMenuOptions();
  }

  onSignIn(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    this.authenticationService.userSignIn(signInDetails);
  }

  onRegister(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    this.authenticationService.userRegistration(signInDetails);
    this.authenticationService.updateUserProfile(formValue);
  }

  onViewStateSelected(viewState: ViewState) {
    this.currentViewState = viewState;
    this.setMenuOptions();
  }

  private setMenuOptions() {
    switch (this.currentViewState) {
      case ViewState.SIGN_IN: {
        this.menuOptions = [
          {
            style: MenuOptionStyle.SECONDARY,
            display: 'Register',
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.REGISTER,
          },
        ];
        break;
      }
      case ViewState.REGISTER: {
        this.menuOptions = [
          {
            style: MenuOptionStyle.SECONDARY,
            display: 'Back to Sign in',
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.SIGN_IN,
          },
        ];
      }
    }
  }
}
