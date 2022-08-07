import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientData } from 'app/interfaces/api.interface';

export interface Options {
  headers: HttpHeaders;
  params: HttpParams;
}

export enum CollectionType {
  LEADS,
  PROFILE,
}

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  constructor(private http: HttpClient) {}

  async getData(url: string, options: Options): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.http.get(url, options).subscribe((response) => {
        const clientData = response as ClientData;
        sessionStorage.setItem('profile', JSON.stringify(clientData.profile));
        sessionStorage.setItem('leads', JSON.stringify(clientData.leads));
        resolve();
      });
      reject();
    });
  }

  async postData(
    collectionType: CollectionType,
    url: string,
    body: any,
    options: Options
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.post(url, body, options).subscribe((docRef) => {
          let doc = docRef as { _path: { segments: string[] } };
          this.sessionStorageAdd(collectionType, body, doc._path.segments[3]);
          resolve();
        });
      } catch {
        reject();
      }
    });
  }

  private sessionStorageAdd(
    collectionType: CollectionType,
    body: any,
    docRef: string
  ) {
    switch (collectionType) {
      case CollectionType.LEADS: {
        let leads = JSON.parse(sessionStorage['leads']);
        leads[docRef] = body;
        sessionStorage.setItem('leads', JSON.stringify(leads));
        return;
      }
      case CollectionType.PROFILE: {
        sessionStorage.setItem('profile', JSON.stringify(body));
      }
    }
  }
}
