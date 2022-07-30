import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';
import { ComponentsPage } from './pages/components/components.page';
import { QuotesPage } from './pages/quotes/quotes.page';

const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'components', component: ComponentsPage },
  { path: 'quotes', component: QuotesPage },
  { path: 'components', component: ComponentsPage },
  { path: 'components', component: ComponentsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
