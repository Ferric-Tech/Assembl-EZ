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
export class LeadsService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private dataManagementService: DataManagementService
  ) {}

  async getLeads(): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      resolve(JSON.parse(sessionStorage['leads']));
      reject();
    });
  }

  async addLead(formValue: { [key: string]: string }): Promise<void> {
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

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.LEAD, url, body, options)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }

  async editLead(formValue: { [key: string]: string }): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/editLead';
    const body = formValue;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams()
        .set('userID', await this.authenticationService.userID)
        .set('leadID', formValue['id']),
    };

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.LEAD, url, body, options)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }
}
