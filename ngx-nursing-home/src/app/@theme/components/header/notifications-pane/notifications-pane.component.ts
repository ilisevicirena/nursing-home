import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { getString } from '../../../../resources/strings';
import { environment } from '../../../../../environments/environment';
import { NotificationsService } from '../../../../services/rest/notifications.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'sample-notifications-pane',
  templateUrl: './notifications-pane.component.html',
  styleUrls: ['./notifications-pane.component.scss']
})
export class NotificationsPaneComponent implements OnInit, OnDestroy {

  public getString = getString;
  public notificationTypes: any[] = [];

  private subs: Subscription[] = [];
  private changes: boolean = false;

  @Output() closeClick: EventEmitter<boolean> = new EventEmitter();
  @Output() destroy: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNotificationTypes();
  }

  ngOnDestroy(): void {
    this.destroy.emit(this.changes);
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getNotificationTypes(): void {
    this.subs.push(
      this.notificationsService.getNotificationTypes().subscribe(data => {
        this.notificationTypes = data;
        this.notificationTypes.unshift(environment.notificationAllType);
        this.getNotifications();
      })
    );
  }

  private getNotifications(): void {
    this.subs.push(
      this.notificationsService.getLatestNotifications().subscribe(data => {
        this.notificationTypes.forEach(element => {
          if (element.Code == 'all') element.Notifications = data;
          else element.Notifications = data.filter(x => x.TypeCode == element.Code);
          element.UnreadNotificationCount = element.Notifications.filter(x => !x.Read).length;
        });
      })
    );
  }

  public onCloseClick(): void {
    this.closeClick.emit(true);
  }

  public onSettingsClick(): void {
    this.closeClick.emit(true);
    this.router.navigateByUrl('/pages/notifications-settings');
  }

  public onMarkAllAsReadClick(): void {
    this.subs.push(
      this.notificationsService.markAllNotificationsAsRead().subscribe(() => {
        this.getNotifications();
        this.changes = true;
      })
    );
  }

  public onShowAllClick(): void {
    this.closeClick.emit();
    this.router.navigateByUrl('/pages/notifications');
  }

  public markNotificationAsRead(notification: any): void {
    this.subs.push(
      this.notificationsService.markNotificationAsRead(notification.Id).subscribe(() => {
        this.getNotifications();
        this.changes = true;
      })
    );
  }

  public goToNotification(notification: any): void {
    this.closeClick.emit();
    this.router.navigateByUrl(notification.GoToLink);
  }
}
