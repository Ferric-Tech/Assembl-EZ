import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthenticationService,
  SignInDetails,
} from './authentication-service.service';
import {
  CollectionType,
  DataManagementService,
} from './data-management.service';

export interface Agent {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(
    private authenticationService: AuthenticationService,
    private dataManagementService: DataManagementService
  ) {}

  getAgents(): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      resolve(JSON.parse(sessionStorage['agents']));
      reject();
    });
  }

  async addAgent(agent: Agent): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/addAgent';
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
        .postData(CollectionType.AGENT, url, agent, options)
        .then(
          async (success) => {
            resolve();
          },
          async (error) => reject()
        );
    });
  }
}
