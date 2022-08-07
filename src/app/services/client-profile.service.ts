import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service.service';
import { DataManagementService } from './data-management.service';

@Injectable({
  providedIn: 'root',
})
export class ClientProfileService {
  constructor(
    private http: HttpClient,
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
        async (success) => resolve(),
        async (error) => reject()
      );
    });
  }

  async updateUserProfile(formValue: {
    [key: string]: string;
  }): Promise<Object> {
    return new Promise(async (resolve) => {
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
      this.http.post(url, body, options).subscribe((response) => {
        resolve(response);
      });
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
