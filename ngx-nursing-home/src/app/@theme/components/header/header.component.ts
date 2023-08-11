import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective, NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../services/rest/notifications.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public getString = getString;
  public hasNotifications: boolean = false;

  private subs: Subscription[] = [];

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit() {
    this.checkNotifications();
  }

  ngOnDestroy() {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  public goToSearchPersons(): void {
    this.router.navigateByUrl('/pages/advanced-search');
  }

  private checkNotifications(): void {
    this.subs.push(
      this.notificationsService.checkNotificationsStatus().subscribe(data => {
        if (data.length > 0) this.hasNotifications = data[0]?.NotificationNumber > 0;
      }));
  }

  public onNotificationPaneClose(): void {
    this.popover.hide();
  }

  public onNotificationsDestroy(event: boolean) {
    if (event) this.checkNotifications();
  }
}
