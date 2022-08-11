import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service.service';
import {
  CollectionType,
  DataManagementService,
} from './data-management.service';

@Injectable({
  providedIn: 'root',
})
export class ClientProfileService {
  constructor(
    private authenticationService: AuthenticationService,
    private dataManagementService: DataManagementService
  ) {}

  async getClientData(): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/getClientData';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set(
        'userID',
        await this.authenticationService.userID
      ),
    };
    return new Promise(async (resolve, reject) => {
      await this.dataManagementService.getData(url, options).then(
        async (success) => {
          resolve();
        },
        async (error) => reject()
      );
    });
  }

  getUserProfile(): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      if (sessionStorage['profile']) {
        resolve(JSON.parse(sessionStorage['profile']));
      }
      reject();
    });
  }

  async updateUserProfile(formValue: { [key: string]: string }): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/updateUserProfile';
    const body = formValue;
    const options = {
      headers: this.getHeaders(),
      params: new HttpParams().set(
        'userID',
        await this.authenticationService.userID
      ),
    };

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.PROFILE, url, body, options)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
