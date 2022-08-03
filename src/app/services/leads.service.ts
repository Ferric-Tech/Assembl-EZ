import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private afs: AngularFirestore
  ) {}

  async getLeads(): Promise<Object> {
    return new Promise(async (resolve) => {
      const url = 'https://us-central1-assembl-ez.cloudfunctions.net/getLeads';
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

  async addLead(formValue: { [key: string]: string }): Promise<Object> {
    return new Promise(async (resolve) => {
      const url = 'https://us-central1-assembl-ez.cloudfunctions.net/addLead';
      const body = formValue;
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
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
}
