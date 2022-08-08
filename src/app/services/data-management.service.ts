import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientData, UserRecord } from 'app/interfaces/api.interface';

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
  constructor(private http: HttpClient) {}

  async getData(url: string, options: Options): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.get(url, options).subscribe((response) => {
          const clientData = response as ClientData;
          sessionStorage.setItem('profile', JSON.stringify(clientData.profile));
          sessionStorage.setItem('leads', JSON.stringify(clientData.leads));
          sessionStorage.setItem('agents', JSON.stringify(clientData.agents));
          resolve();
        });
      } catch {
        reject();
      }
    });
  }

  async postData(
    collectionType: CollectionType,
    url: string,
    body: any,
    options: Options
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      switch (collectionType) {
        case CollectionType.AGENT: {
          try {
            this.http.post(url, body, options).subscribe((response) => {
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
            this.http.post(url, body, options).subscribe((docRef) => {
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
            this.http.post(url, body, options).subscribe((docRef) => {
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
        sessionStorage.setItem('profile', JSON.stringify(body));
      }
    }
  }
}
