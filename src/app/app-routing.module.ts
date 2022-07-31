import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsPage } from './pages/leads/leads.page';
import { MainPage } from './pages/main/main.page';
import { ComponentsPage } from './pages/products/presentationals/components/components.screen';
import { ProductsPage } from './pages/products/products.page';
import { QuotesPage } from './pages/quotes/quotes.page';

const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'leads', component: LeadsPage },
  { path: 'quotes', component: QuotesPage },
  { path: 'products', component: ProductsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
