import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../../resources/strings';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../services/rest/notifications.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'sample-notifications-settings',
  templateUrl: './notifications-settings.component.html',
  styleUrls: ['./notifications-settings.component.scss']
})
export class NotificationsSettingsComponent implements OnInit, OnDestroy {

  public getString = getString;
  public types: any[] = [];

  private subs: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getNotificationTypes();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getNotificationTypes(): void {
    this.subs.push(
      this.notificationsService.getNotificationsSettings().subscribe(data => {
        this.types = data;
      })
    );
  }

  public onEnabledChange(t): void {
    this.updateNotification(t);
  }

  public onDaysReminderChange(t): void {
    this.updateNotification(t);
  }

  private updateNotification(n: any): void {
    this.subs.push(
      this.notificationsService.updateNotification(n.Id, n.Enabled, n.DaysReminder).subscribe(() => {
        this.toastrService.showToast('success', getString('saveSuccess'));
        this.getNotificationTypes();
      })
    );
  }
}
