import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  SignInDetails,
} from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
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
  }

  signin(signInDetails: SignInDetails) {
    this.authenticationService.UserSignIn(signInDetails);
  }

  register(signInDetails: SignInDetails) {
    this.authenticationService.UserRegistration(signInDetails);
  }
}
