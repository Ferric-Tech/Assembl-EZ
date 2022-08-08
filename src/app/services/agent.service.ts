import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormFieldOption } from 'app/interfaces/form-screen.interface';
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

  getAgents(): Promise<{ [key: string]: Agent }> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(JSON.parse(sessionStorage['agents']));
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAgentOptions(): Promise<FormFieldOption[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let listOfAgents: FormFieldOption[] = [];
        const agents = await this.getAgents();
        Object.keys(agents).forEach((id) => {
          listOfAgents.push({
            display: agents[id].firstName + agents[id].lastName,
            value: id,
          });
        });
        resolve(listOfAgents);
      } catch (error) {
        reject(error);
      }
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
