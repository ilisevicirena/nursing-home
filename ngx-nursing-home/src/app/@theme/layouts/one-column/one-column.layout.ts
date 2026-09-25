import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NbSidebarComponent,
  NbSidebarService,
  NbTooltipComponent,
  NbTooltipDirective,
} from "@nebular/theme";
import {
  environment,
  SidebarStates,
} from "../../../../environments/environment";
import { getString } from "../../../resources/strings";
import { Router } from "@angular/router";
import { timeStamp } from "console";

@Component({
    selector: "ngx-one-column-layout",
    styleUrls: ["./one-column.layout.scss"],
    templateUrl: "./one-column.layout.html",
    standalone: false
})
export class OneColumnLayoutComponent implements OnInit {
  constructor(
    private sidebarService: NbSidebarService,
    private router: Router
  ) {}

  public showItems: boolean = false;
  public getString = getString;
  public searchTerm: string = "";

  @ViewChild(NbTooltipDirective) tooltip: NbTooltipDirective;

  ngOnInit(): void {
    this.sidebarService.onToggle().subscribe((data) => {
      this.showItems = !this.showItems;
    });

    this.sidebarService.onCompact().subscribe((data) => {
      this.showItems = false;
    });

    this.sidebarService.onExpand().subscribe((data) => {
      this.showItems = true;
    });

    this.sidebarService.onCollapse().subscribe((data) => {
      this.showItems = false;
    });
  }

  public toggleSidebar() {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.tooltip.hide();
  }

  public onSerachKeyPress(event: KeyboardEvent): void {
    if (event.charCode == 13) {
      // enter key
      this.router.navigateByUrl("/pages/advanced-search/" + this.searchTerm);
      this.searchTerm = "";
      this.sidebarService.toggle(true, "menu-sidebar");
    }
  }
}
