import { Component } from '@angular/core';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { ClientProfileService } from 'app/services/client-profile.service';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  currentViewState = ViewState.MENU;
  viewState = ViewState;
  profile: { [key: string]: any } = {};

  constructor(
    private profileService: ClientProfileService,
    private loadingService: LoadingService
  ) {}

  onProfileUpdated(formValue: { [key: string]: string }) {
    this.loadingService.setLoading();
    this.profileService.updateUserProfile(formValue).then(
      async (success) => {
        this.loadingService.cancelLoading();
        this.onViewStateSelected(ViewState.PROFILE);
      },
      async (error) => {
        this.loadingService.cancelLoading();
      }
    );
  }

  onUpdateCancelled() {
    this.onViewStateSelected(ViewState.PROFILE);
  }

  async onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.PROFILE:
      case ViewState.EDIT_BASICS:
      case ViewState.EDIT_BUS_BASICS:
      case ViewState.EDIT_BUS_CONTACTS: {
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
