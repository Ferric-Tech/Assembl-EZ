import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor() {}

  generateQuote(quoteParams: any) {
    console.log(quoteParams);
  }
}
