import { Component } from "@angular/core";

import { MENU_ITEMS, USER_MENU_ITEMS } from "./pages-menu";
import { NbMenuService } from "@nebular/theme";
import { DialogService } from "../shared/dialog/dialog.service";
import { Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { AuthService, UserRole } from "../services/auth.service";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" tag="main-menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = [];

  private _subs: Subscription[] = [];

  constructor(
    private menuService: NbMenuService,
    private dialogService: DialogService,
    private authService: AuthService
  ) {
    this._subs.push(
      this.menuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => {
            return tag?.startsWith("main-menu");
          }),
          map(({ item }) => item)
        )
        .subscribe((item: any) => {
          if (item.click) item.click(this.dialogService);
        })
    );

    if (this.authService.checkUserHasRole(UserRole.USER))
      this.menu = USER_MENU_ITEMS;
    else this.menu = MENU_ITEMS;
  }
}
