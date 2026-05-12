import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { MENU_ITEMS } from "../pages-menu";
import { hexToRgbA } from "../../resources/functions";
import { Router } from "@angular/router";
import { DialogService } from "../../shared/dialog/dialog.service";

@Component({
  selector: "sample-modules-menu",
  templateUrl: "./modules-menu.component.html",
  styleUrls: ["./modules-menu.component.scss"],
})
export class ModulesMenuComponent implements OnInit, OnDestroy {
  constructor(
    private _ref: NbDialogRef<ModulesMenuComponent>,
    private _router: Router,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.selectedModule = this.menuItems[0];
    this.menuItems[0].selected = true;
  }

  ngOnDestroy(): void {}

  public getString = getString;
  public hexToRgba = hexToRgbA;
  public menuItems = MENU_ITEMS;
  public selectedModule: any = null;

  public selectModule(item: any) {
    if (item.link) {
      this._ref.close();
      this._router.navigateByUrl(item.link);
    } else {
      this.menuItems.map((x) => (x.selected = false));
      item.selected = true;
      this.selectedModule = item;
    }
  }

  public onMouseOver(event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.style.backgroundColor = hexToRgbA(this.selectedModule.color, 0.16);
  }

  public onMouseOut(event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.style.backgroundColor = hexToRgbA(this.selectedModule.color);
  }

  public onPageBtnClick(page: any) {
    this._ref.close();
    if (page.link) this._router.navigateByUrl(page.link);
    else {
      this._dialogService.open(page.component, {
        closeOnBackdropClick: false,
        closeOnEsc: false,
        autoFocus: false,
      });
    }
  }
}
