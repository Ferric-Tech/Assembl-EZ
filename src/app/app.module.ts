import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './pages/main/main.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { PriceInputsPage } from './pages/price-inputs/price-inputs.page';
import { QuotesPage } from './pages/quotes/quotes.page';
import { MenuComponent } from './screens/menu/menu.component';

@NgModule({
  declarations: [AppComponent, MainPage, PriceInputsPage, QuotesPage, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
