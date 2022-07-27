import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './pages/main/main.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { PriceInputsPage } from './pages/price-inputs/price-inputs.page';
import { QuotesPage } from './pages/quotes/quotes.page';
import { MenuScreen } from './screens/menu/menu.screen';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormScreen } from './screens/form/form.screen';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionTableScreen } from './screens/expansion-table/expansion-table.screen';
import { ListScreen } from './screens/list/list.screen';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    PriceInputsPage,
    QuotesPage,
    MenuScreen,
    PageHeaderComponent,
    FormScreen,
    ExpansionTableScreen,
    ListScreen,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
