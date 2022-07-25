import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  menuOptions = [
    { display: 'Price Inputs', link: 'price-inputs' },
    { display: 'Quotes', link: 'quotes' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
