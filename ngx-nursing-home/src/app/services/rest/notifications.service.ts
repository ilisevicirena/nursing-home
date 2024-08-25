import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root",
})
export class NotificationsService extends BaseRestApiService {
  constructor(http: HttpClient, private _authService: AuthService) {
    super(http, "api/notifications");
  }

  public checkNotificationsStatus(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/checkNotificationsStatus?UserId=" +
        this._authService.getUserId()
    );
  }

  public getAll(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getAllNotifications?UserId=" +
        this._authService.getUserId()
    );
  }

  public getLatestNotifications(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getLatestNotifications?UserId=" +
        this._authService.getUserId()
    );
  }

  public markNotificationAsRead(id: number): Observable<any> {
    return this.http.post(this.apiRoute + "/markNotificationAsRead", {
      Id: id,
    });
  }

  public markAllNotificationsAsRead(): Observable<any> {
    return this.http.post(this.apiRoute + "/markAllNotificationsAsRead", {
      UserId: this._authService.getUserId(),
    });
  }

  public getNotificationTypes(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/notificationTypes?UserId=" +
        this._authService.getUserId()
    );
  }

  public getNotificationsForType(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getNotificationsForType?Id=" +
        id +
        "&UserId=" +
        this._authService.getUserId()
    );
  }

  public getNotificationsSettings(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getNotificationsSettings?UserId=" +
        this._authService.getUserId()
    );
  }

  public updateNotification(
    id: number,
    enabled: boolean,
    daysReminder: number
  ): Observable<any> {
    return this.http.post(this.apiRoute + "/updateNotificationType", {
      Id: id,
      Enabled: enabled,
      DaysReminder: daysReminder,
    });
  }
}
