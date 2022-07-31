import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './pages/main/main.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsPage } from './pages/products/presentationals/components/components.page';
import { QuotesPage } from './pages/quotes/quotes.page';
import { MenuScreen } from './components/menu/menu.screen';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormScreen } from './components/form/form.screen';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionTableScreen } from './components/expansion-table/expansion-table.screen';
import { ListScreen } from './components/list/list.screen';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsPage } from './pages/products/products.page';
import { LeadsPage } from './pages/leads/leads.page';
import { ProductSelectScreen } from './pages/quotes/presentationals/product-select/product-select.screen';
import { ProductMeasurementsScreen } from './pages/quotes/presentationals/product-measurements/product-measurements.screen';
import { QuoteParametersScreen } from './pages/quotes/presentationals/quote-parameters/quote-parameters.screen';

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    ComponentsPage,
    QuotesPage,
    MenuScreen,
    PageHeaderComponent,
    FormScreen,
    ExpansionTableScreen,
    ListScreen,
    ProductsPage,
    LeadsPage,
    ProductSelectScreen,
    ProductMeasurementsScreen,
    QuoteParametersScreen,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
