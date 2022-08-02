import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  async addLead(formValue: { [key: string]: string }) {
    // Test with DKNQuGGHVGMG5FX1eeqrMp5jZ9P2
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/addLead';
    const body = formValue;
    const options = {
      headers: this.getHeaders(),
      params: new HttpParams().set(
        'userID',
        await this.authenticationService.userID
      ),
    };

    this.http.post(url, body, options).subscribe((res) => {
      console.log(res);
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
