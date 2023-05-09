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
  public notificationTypes = environment.notificationTypes.map(({ code, stringKey }) => ({ code, stringKey, notifications: [], unreadNotificationCount: 0 }));

  private subs: Subscription[] = [];
  private changes: boolean = false;

  @Output() closeClick: EventEmitter<boolean> = new EventEmitter();
  @Output() destroy: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  ngOnDestroy(): void {
    this.destroy.emit(this.changes);
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getNotifications(): void {
    this.subs.push(
      this.notificationsService.getLatestNotifications().subscribe(data => {
        this.notificationTypes.forEach(element => {
          if (element.code == 'all') element.notifications = data;
          else element.notifications = data.filter(x => x.TypeCode == element.code);
          element.unreadNotificationCount = element.notifications.filter(x => !x.Read).length;
        });
      })
    );
  }

  public onCloseClick(): void {
    this.closeClick.emit(true);
  }

  public onSettingsClick(): void {

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
    this.router.navigateByUrl('/pages/notifications')
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

  }
}
