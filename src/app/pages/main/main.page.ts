import { Component } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Leads',
      optionType: MenuOptionType.URL,
      link: 'leads',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Quotes',
      optionType: MenuOptionType.URL,
      link: 'quotes',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Products',
      optionType: MenuOptionType.URL,
      link: 'products',
    },
  ];
}
