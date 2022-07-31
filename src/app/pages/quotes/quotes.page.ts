import { Component } from '@angular/core';
import { QuotePageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';
import { QuoteResponse, QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.PRODUCT_SELECT;
  quoteResponse: QuoteResponse | undefined;
  quoteParams = {} as any;

  menuOptions = [{ display: 'Back', link: '' }];
  isSubmittable = false;

  constructor(private quotesService: QuotesService) {}

  onProductSelectFormSubmitted(formValue: any) {
    this.quoteParams = formValue;
    this.currentViewState = ViewState.PRODUCT_MEASUREMENTS;
  }

  onProductMeasurementFormSubmitted(formValue: { [key: string]: string }) {
    this.quoteParams = { ...this.quoteParams, ...formValue };
    this.currentViewState = ViewState.QUOTE_PARAMETERS;
  }

  onQuoteParametersFormSubmitted(formValue: { [key: string]: string }) {
    this.quoteParams = { ...this.quoteParams, ...formValue };
    this.quoteResponse = this.quotesService.generateQuote(this.quoteParams);
    this.currentViewState = ViewState.RESULTS;
  }
}
