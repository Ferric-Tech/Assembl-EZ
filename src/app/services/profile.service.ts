import { Injectable } from '@angular/core';
import { ClientData, UserInfo } from 'app/interfaces/api.interface';
import {
  CollectionType,
  DataManagementService,
} from './data-management.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private dataManagementService: DataManagementService) {}

  getUserProfile(): UserInfo {
    return sessionStorage['profile']
      ? JSON.parse(sessionStorage['profile'])
      : {};
  }

  async updateUserProfile(formValue: { [key: string]: string }): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/updateUserProfile';
    const body = formValue;

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.PROFILE, url, body)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }
}
