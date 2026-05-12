import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  NbPopoverDirective,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";
import { LayoutService } from "../../../@core/utils";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { Router } from "@angular/router";
import { NotificationsService } from "../../../services/rest/notifications.service";
import { AuthService, IUser } from "../../../services/auth.service";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  public getString = getString;
  public hasNotifications: boolean = false;
  public searchTerm: string = "";
  public user: IUser;

  private subs: Subscription[] = [];

  @ViewChildren(NbPopoverDirective) popovers: NbPopoverDirective[];

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private themeService: NbThemeService
  ) {}

  ngOnInit() {
    this.checkNotifications();
    this.user = this.authService.getUser();

    this.themeService.onMediaQueryChange().subscribe((data) => {
      setTimeout(() => {
        if (data[1].name == "xs" || data[1].name == "is")
          this.sidebarService.collapse("menu-sidebar");
        else this.sidebarService.compact("menu-sidebar");
      }, 100);
    });
  }

  ngOnDestroy() {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  public goToSearchPersons(): void {
    this.router.navigateByUrl("/pages/advanced-search");
  }

  private checkNotifications(): void {
    this.subs.push(
      this.notificationsService.checkNotificationsStatus().subscribe((data) => {
        if (data.length > 0)
          this.hasNotifications = data[0]?.NotificationNumber > 0;
      })
    );
  }

  public onNotificationPaneClose(): void {
    this.popovers.forEach((element) => {
      element.hide();
    });
  }

  public onNotificationsDestroy(event: boolean) {
    if (event) this.checkNotifications();
  }

  public onSerachKeyPress(event: KeyboardEvent): void {
    if (event.charCode == 13) {
      // enter key
      this.router.navigateByUrl("/pages/advanced-search/" + this.searchTerm);
      this.searchTerm = "";
    }
  }

  public onUserPaneDestroy() {
    this.popovers.forEach((element) => {
      element.hide();
    });
  }
}
