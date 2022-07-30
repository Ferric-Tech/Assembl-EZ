import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './pages/main/main.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { PriceInputsPage } from './pages/components/components.page';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsPage } from './pages/products/products.page';

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
    ProductsPage,
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
