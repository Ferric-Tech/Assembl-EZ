import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  menuOptions = [{ display: 'Back', link: '' }];

  constructor() {}

  ngOnInit(): void {}
}
