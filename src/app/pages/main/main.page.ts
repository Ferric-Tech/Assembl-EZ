import { Component } from '@angular/core';
import {
  MenuOption,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  menuOptions: MenuOption[] = [
    { display: 'Leads', optionType: MenuOptionType.URL, link: 'leads' },
    { display: 'Quotes', optionType: MenuOptionType.URL, link: 'quotes' },
    { display: 'Products', optionType: MenuOptionType.URL, link: 'products' },
  ];
}
