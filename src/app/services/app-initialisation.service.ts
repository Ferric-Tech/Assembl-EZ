import { Injectable } from '@angular/core';
import { ClientData, FlagData, UserInfo } from 'app/interfaces/api.interface';
import { DataManagementService } from './data-management.service';
import { FeatureFlagsService } from './feature-flags.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitialisationService {
  private profile: UserInfo | undefined;
  constructor(
    private dataManagementService: DataManagementService,
    private featureFlagsService: FeatureFlagsService,
    private profileService: ProfileService
  ) {}

  async intialise() {
    await this.getClientData();
    // this.alphaUserSetUp();
  }

  async getClientData(): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/getClientData';

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService.getData(url).then(
        async (response) => {
          const clientData = response as ClientData;
          this.setLocal('profile', clientData.profile.userInfo);
          this.setLocal('leads', clientData.leads);
          this.setLocal('agents', clientData.agents);
          this.setLocal('flags', clientData.profile.flags);
          resolve();
        },
        async (error) => reject(error)
      );
    });
  }

  private setLocal(dataDescription: string, data: Object) {
    sessionStorage.setItem(dataDescription, JSON.stringify(data));
  }

  private alphaUserSetUp() {
    let flags: FlagData = this.featureFlagsService.getUserFeatureFlags();
    if (Object.keys(flags).length === 0) {
      if (this.isAlphaUser()) {
        (Object.keys(flags) as Array<keyof FlagData>).forEach((flag) => {
          flags[flag] = false;
        });
      }
    }
  }

  private setUserFeatureFlags() {
    this.profile;
  }

  private isAlphaUser(): boolean {
    let profile = this.profileService.getUserProfile();
    return profile.isAlphaUser;
  }
}
