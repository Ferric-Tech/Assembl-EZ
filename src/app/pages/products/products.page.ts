import { Component } from '@angular/core';
import { ProductsPageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.MENU;
  menuOptions: MenuOption[] = [
    {
      display: 'Components',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.COMPONENTS,
    },
  ];

  onViewStateSelected(viewState: ViewState) {
    this.currentViewState = viewState;
  }
}
