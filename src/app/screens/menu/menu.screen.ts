import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOption } from 'src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-menu-screen',
  templateUrl: './menu.screen.html',
  styleUrls: ['./menu.screen.scss'],
})
export class MenuScreen implements OnInit {
  @Input() menuOptions: MenuOption[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onOptionClicked(link: string) {
    this.router.navigateByUrl(link);
  }
}
