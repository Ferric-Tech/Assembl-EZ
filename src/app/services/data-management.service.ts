import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientData, UserRecord } from 'app/interfaces/api.interface';
import { AuthenticationService } from './authentication-service.service';

export interface Options {
  headers: HttpHeaders;
  params: HttpParams;
}

export enum CollectionType {
  AGENT,
  LEAD,
  PROFILE,
}

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  async getData(url: string): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      try {
        this.http
          .get(url, await this.setHttpOptions())
          .subscribe((response) => {
            resolve(response);
          });
      } catch {
        reject();
      }
    });
  }

  async postData(
    collectionType: CollectionType,
    url: string,
    body: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      switch (collectionType) {
        case CollectionType.AGENT: {
          try {
            this.http
              .post(url, body, await this.setHttpOptions())
              .subscribe((response) => {
                let userRecord = response as UserRecord;
                this.sessionStorageAdd(collectionType, body, userRecord.uid);
                resolve();
              });
          } catch {
            reject();
          }
          return;
        }
        case CollectionType.LEAD: {
          try {
            this.http
              .post(url, body, await this.setHttpOptions())
              .subscribe((docRef) => {
                let doc = docRef as { _path: { segments: string[] } };
                this.sessionStorageAdd(
                  collectionType,
                  body,
                  doc._path.segments[3]
                );
                resolve();
              });
          } catch {
            reject();
          }
          return;
        }
        case CollectionType.PROFILE: {
          try {
            this.http
              .post(url, body, await this.setHttpOptions())
              .subscribe((docRef) => {
                let doc = docRef as { _path: { segments: string[] } };
                this.sessionStorageAdd(
                  collectionType,
                  body,
                  doc._path.segments[1]
                );
                resolve();
              });
          } catch {
            reject();
          }
          return;
        }
      }
    });
  }

  private sessionStorageAdd(
    collectionType: CollectionType,
    body: any,
    docRef: string
  ) {
    switch (collectionType) {
      case CollectionType.LEAD: {
        let leads = JSON.parse(sessionStorage['leads']);
        leads[docRef] = body;
        sessionStorage.setItem('leads', JSON.stringify(leads));
        return;
      }
      case CollectionType.AGENT: {
        let leads: { [key: string]: any } = {};
        if (sessionStorage['agents']) {
          leads = JSON.parse(sessionStorage['agents']);
        }
        leads[docRef] = body;
        sessionStorage.setItem('agents', JSON.stringify(leads));
        return;
      }
      case CollectionType.PROFILE: {
        let profile: { [key: string]: any } = {};
        if (sessionStorage['profile']) {
          profile = JSON.parse(sessionStorage['profile']);
        }
        Object.keys(body).forEach((key) => {
          profile[key] = body[key];
        });

        sessionStorage.setItem('profile', JSON.stringify(profile));
      }
    }
  }

  private async setHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set(
        'userID',
        await this.authenticationService.userID
      ),
    };
  }
}
