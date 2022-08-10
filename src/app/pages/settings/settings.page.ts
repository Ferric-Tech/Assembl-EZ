import { Component } from '@angular/core';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { ClientProfileService } from 'app/services/client-profile.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  currentViewState = ViewState.MENU;
  viewState = ViewState;
  profile: { [key: string]: any } = {};

  constructor(private profileService: ClientProfileService) {}

  async onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.PROFILE: {
        await this.getUpdatedProfile();
        break;
      }
    }
    this.currentViewState = viewState;
  }

  private async getUpdatedProfile(): Promise<void> {
    await this.profileService.getUserProfile().then(
      async (profile) => {
        this.profile = profile;
      },
      (error) => {}
    );
  }
}
