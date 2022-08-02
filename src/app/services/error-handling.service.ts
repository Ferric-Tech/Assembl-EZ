import { ConditionalExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  handleError(error: string) {
    if (error.includes('auth/invalid-email')) {
      console.log('invalid-email');
    }
    if (error.includes('auth/user-not-found')) {
      console.log('user-not-found');
    }
    if (error.includes('auth/wrong-password')) {
      console.log('wrong-password');
    }
    if (error.includes('auth/email-already-exists')) {
      console.log('email-already-exists');
    }
  }
}

// Full list of possible firebase errors:https://firebase.google.com/docs/auth/admin/errors

// auth/internal-error	        The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.
// auth/invalid-display-name	  The provided value for the displayName user property is invalid. It must be a non-empty string.
// auth/invalid-email	          The provided value for the email user property is invalid. It must be a string email address.
// auth/invalid-email-verified	The provided value for the emailVerified user property is invalid. It must be a boolean.
// auth/invalid-password	      The provided value for the password user property is invalid. It must be a string with at least six characters.
// auth/invalid-phone-number	  The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.
// auth/invalid-photo-url	      The provided value for the photoURL user property is invalid. It must be a string URL.
// auth/invalid-uid	            The provided uid must be a non-empty string with at most 128 characters.
// auth/uid-already-exists	    The provided uid is already in use by an existing user. Each user must have a unique uid.
// auth/user-not-found	        There is no existing user record corresponding to the provided identifier.
