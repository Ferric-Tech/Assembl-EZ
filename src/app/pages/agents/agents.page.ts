import { Component } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { EmailsService } from 'app/services/emails.service';
import {
  AuthenticationService,
  SignInDetails,
} from 'app/services/authentication-service.service';

@Component({
  selector: 'app-agents-page',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage {
  viewState = ViewState;
  currentViewState = ViewState.MENU;

  constructor(
    private emailsService: EmailsService,
    private authenticationService: AuthenticationService
  ) {}

  async onNewAgentFormSubmitted(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
      parentProfile: await this.authenticationService.userID,
    };
    await this.authenticationService.userRegistration(signInDetails).then(
      (success) => {},
      (error) => {}
    );
    this.emailsService.newAgentEmail();
    this.currentViewState = ViewState.MENU;
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
  }
}
