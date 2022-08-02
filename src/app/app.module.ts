import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './pages/main/main.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsPage } from './pages/products/presentationals/components/components.screen';
import { QuotesPage } from './pages/quotes/quotes.page';
import { MenuComponent } from './components/menu/menu.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionTableComponent } from './components/expansion-table/expansion-table.component';
import { ListComponent } from './components/list/list.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsPage } from './pages/products/products.page';
import { LeadsPage } from './pages/leads/leads.page';
import { ProductSelectScreen } from './pages/quotes/presentationals/product-select/product-select.screen';
import { ProductMeasurementsScreen } from './pages/quotes/presentationals/product-measurements/product-measurements.screen';
import { QuoteParametersScreen } from './pages/quotes/presentationals/quote-parameters/quote-parameters.screen';
import { QuoteResultsScreen } from './pages/quotes/presentationals/quote-results/quote-results.screen';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignInModal } from './modals/sign-in/sign-in.modal';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyBFMwDB68eP6eixiHx5k6HxbnCnWf1HVQg',
  authDomain: 'assembl-ez.firebaseapp.com',
  projectId: 'assembl-ez',
  storageBucket: 'assembl-ez.appspot.com',
  messagingSenderId: '784618520751',
  appId: '1:784618520751:web:db23f981d1a70b867f145a',
  measurementId: 'G-51G0C91VTB',
};
@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    ComponentsPage,
    QuotesPage,
    MenuComponent,
    PageHeaderComponent,
    FormComponent,
    ExpansionTableComponent,
    ListComponent,
    ProductsPage,
    LeadsPage,
    ProductSelectScreen,
    ProductMeasurementsScreen,
    QuoteParametersScreen,
    QuoteResultsScreen,
    SignInPage,
    SignInModal,
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
