import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  async getClientData(): Promise<Object> {
    return new Promise(async (resolve) => {
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

      this.http.get(url, options).subscribe((response) => {
        resolve(response);
      });
    });
  }
}
