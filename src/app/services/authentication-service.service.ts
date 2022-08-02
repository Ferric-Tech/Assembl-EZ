import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface SignInDetails {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.userData = angularFireAuth.authState as unknown as Observable<User>;
  }

  get userID(): string {
    this.angularFireAuth.currentUser.then((user) => {
      return user?.uid;
    });
    return '';
  }

  /* Sign up */
  userRegistration(signInDetails: SignInDetails) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(
        signInDetails.email,
        signInDetails.password
      )
      .then((res: any) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error: any) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  userSignIn(signInDetails: SignInDetails) {
    this.angularFireAuth
      .signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
      .then((res: any) => {
        this.router.navigate(['']);
      })
      .catch((err: any) => {
        console.log('Something went wrong:', err.message);
      });
  }

  /* Sign out */
  signOut() {
    this.angularFireAuth.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.angularFireAuth.onAuthStateChanged((user) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  updateUserProfile(formValue: { [key: string]: string }) {
    // Test with DKNQuGGHVGMG5FX1eeqrMp5jZ9P2
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/updateUserProfile';
    const body = formValue;
    const options = {
      headers: this.getHeaders(),
      params: new HttpParams().set('userID', this.userID),
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
