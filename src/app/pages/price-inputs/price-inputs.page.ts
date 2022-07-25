import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-inputs-page',
  templateUrl: './price-inputs.page.html',
  styleUrls: ['./price-inputs.page.scss'],
})
export class PriceInputsPage implements OnInit {
  menuOptions = [{ display: 'Back', link: '' }];
  constructor() {}

  ngOnInit(): void {}
}
