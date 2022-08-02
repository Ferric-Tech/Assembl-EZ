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
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

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
    private router: Router,
    private errorHandlingService: ErrorHandlingService
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

  async onSignIn(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    await this.authenticationService.userSignIn(signInDetails).then(
      (success) => this.router.navigate(['']),
      (error) => this.errorHandlingService.handleError(error)
    );
  }

  async onRegister(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    await this.authenticationService.userRegistration(signInDetails).then(
      (success) => {
        this.authenticationService.updateUserProfile(formValue);
        this.router.navigate(['']);
      },
      (error) => this.errorHandlingService.handleError(error)
    );
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
