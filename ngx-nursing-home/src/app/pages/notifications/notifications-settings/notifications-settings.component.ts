import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../../resources/strings";
import { Subscription } from "rxjs";
import { NotificationsService } from "../../../services/rest/notifications.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
    selector: "sample-notifications-settings",
    templateUrl: "./notifications-settings.component.html",
    styleUrls: ["./notifications-settings.component.scss"],
    standalone: false
})
export class NotificationsSettingsComponent implements OnInit, OnDestroy {
  public getString = getString;
  public types: any[] = [];

  private _subs: Subscription[] = [];

  constructor(
    private _notificationsService: NotificationsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNotificationTypes();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getNotificationTypes(): void {
    this._subs.push(
      this._notificationsService
        .getNotificationsSettings()
        .subscribe((data) => {
          this.types = data;
        })
    );
  }

  public onEnabledChange(t: any): void {
    this.updateNotification(t);
  }

  public onDaysReminderChange(t: any): void {
    this.updateNotification(t);
  }

  private updateNotification(n: any): void {
    this._subs.push(
      this._notificationsService
        .updateNotification(n.Id, n.Enabled, n.DaysReminder)
        .subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getNotificationTypes();
        })
    );
  }
}
