import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../services/rest/notifications.service';
import { Router } from '@angular/router';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'sample-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  public getString = getString;
  public notificationTypes: any[] = [];
  public searchTerm: string = "";
  public notifications: any[] = [];
  public allNotifications: any[] = [];
  public showAll: boolean = true;
  public showAllActive: boolean = true;
  public selected: number = this.notifications.filter(x => x.Selected).length;

  private subs: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getNotificationTypes();
    this.getNotifications();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getNotificationTypes(): void {
    this.subs.push(
      this.notificationsService.getNotificationTypes().subscribe(data => {
        this.notificationTypes = data;
      })
    );
  }

  private getNotifications(): void {
    this.subs.push(
      this.notificationsService.getData().subscribe(data => {
        this.notifications = data;
        this.allNotifications = data;
      })
    );
  }

  public onViewChange(event): void {
    if (event) {
      if (event[0] == 1) {
        this.showAllActive = true;
        this.notifications = this.allNotifications;
      }
      else {
        this.showAllActive = false;
        this.notifications = this.allNotifications.filter(x => !x.Read);
      }
    }
  }

  private getNotificationsForType(type: any): void {
    this.subs.push(
      this.notificationsService.getNotificationsForType(type.Id).subscribe(data => {
        this.allNotifications = data;
        if (this.showAllActive) this.notifications = data;
        else this.notifications = this.allNotifications.filter(x => !x.Read);
      })
    );
  }

  public filterChange(nt: any): void {
    this.notificationTypes.map(x => x.Selected = false);

    if (nt == 'all') {
      this.showAll = true;
      this.getNotifications();
    } else {
      this.showAll = false;
      nt.Selected = true;
      this.getNotificationsForType(nt);
    }
  }

  public onCheckedChange(): void {
    this.selected = this.notifications.filter(x => x.Selected).length;
  }

  public selectAll(): void {
    this.notifications.map(x => {
      if (!x.Read) x.Selected = true;
      return x;
    });

    this.selected = this.notifications.filter(x => x.Selected).length;
  }

  public clearAll(): void {
    this.notifications.map(x => x.Selected = false);
    this.selected = this.notifications.filter(x => x.Selected).length;
  }

  public markSelectedAsRead(): void {
    var selectedNotifications = this.notifications.filter(x => x.Selected);

    for (let index = 0; index < selectedNotifications.length; index++) {
      const element = selectedNotifications[index];
      this.subs.push(
        this.notificationsService.markNotificationAsRead(element.Id).subscribe(() => {
          this.toastrService.showToast('success', getString("saveSuccess"));
          if (index == selectedNotifications.length - 1) this.refreshNotifications();
        })
      );
    }
  }

  private refreshNotifications(): void {
    var selectedType = this.notificationTypes.find(x => x.Selected);
    this.filterChange(selectedType ?? 'all');
  }

  public markAllAsRead(): void {
    this.subs.push(
      this.notificationsService.markAllNotificationsAsRead().subscribe(() => {
        this.refreshNotifications();
        this.toastrService.showToast('success', getString("saveSuccess"));
      })
    );
  }

  public manageNotifications(): void {
    this.router.navigateByUrl('/pages/notifications-settings');
  }

  public markAsRead(n: any): void {
    this.subs.push(
      this.notificationsService.markNotificationAsRead(n.Id).subscribe(() => {
        this.refreshNotifications();
        this.toastrService.showToast('success', getString("saveSuccess"));
      })
    );
  }

  public goToNotification(n: any): void {
    this.router.navigateByUrl(n.GoToLink);
  }
}
