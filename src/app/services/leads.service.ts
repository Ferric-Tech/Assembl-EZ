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

  async getLeads() {
    const docRef = this.afs
      .collection('client-data')
      .doc((await this.authenticationService.userID).toString())
      .collection('leads');

    docRef.get().subscribe((doc: any) => {
      if (doc) {
        console.log('Document data:', doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  }

  async addLead(formValue: { [key: string]: string }) {
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
      console.log(response);
    });
  }
}
