import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';
import { PriceInputsPage } from './pages/price-inputs/price-inputs.page';
import { QuotesPage } from './pages/quotes/quotes.page';

const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'price-inputs', component: PriceInputsPage },
  { path: 'quotes', component: QuotesPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
