import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
    private http: HttpClient
  ) {
    this.userData = angularFireAuth.authState as unknown as Observable<User>;
  }

  get userID(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth.currentUser
        .then((user) => {
          resolve(user?.uid as string);
        })
        .catch(() => {
          reject('');
        });
    });
  }

  userRegistration(signInDetails: SignInDetails): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(
          signInDetails.email,
          signInDetails.password
        )
        .then((res: any) => {
          resolve({ response: 'auth/successful' });
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  userSignIn(signInDetails: SignInDetails): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
        .then((res: any) => {
          resolve({ response: 'auth/successful' });
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  signOut() {
    this.angularFireAuth.signOut();
  }

  resetPassword(email: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ response: 'password-reset/successful' });
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.angularFireAuth.onAuthStateChanged((user) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  async updateUserProfile(formValue: {
    [key: string]: string;
  }): Promise<Object> {
    return new Promise(async (resolve) => {
      const url =
        'https://us-central1-assembl-ez.cloudfunctions.net/updateUserProfile';
      const body = formValue;
      const options = {
        headers: this.getHeaders(),
        params: new HttpParams().set('userID', await this.userID),
      };
      this.http.post(url, body, options).subscribe((response) => {
        resolve(response);
      });
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
