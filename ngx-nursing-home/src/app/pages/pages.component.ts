import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbMenuService } from '@nebular/theme';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(
    private menuService: NbMenuService,
    private dialogService: DialogService
  ) {
    this.menuService.onItemClick().subscribe((data) => {
      if (data.item.link === undefined) {
        const item = data.item as any;
        item.click(dialogService);
      }
    });
  }

}
