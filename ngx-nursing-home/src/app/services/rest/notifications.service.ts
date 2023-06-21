import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/notifications');
  }

  public checkNotificationsStatus(): Observable<any> {
    return this.http.get(this.apiRoute + "/checkNotificationsStatus");
  }

  public getLatestNotifications(): Observable<any> {
    return this.http.get(this.apiRoute + "/getLatestNotifications");
  }

  public markNotificationAsRead(id: number): Observable<any> {
    return this.http.post(this.apiRoute + "/markNotificationAsRead", { Id: id });
  }

  public markAllNotificationsAsRead(): Observable<any> {
    return this.http.post(this.apiRoute + "/markAllNotificationsAsRead", {});
  }

  public getNotificationTypes(): Observable<any> {
    return this.http.get(this.apiRoute + "/notificationTypes");
  }

  public getNotificationsForType(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getNotificationsForType?Id=" + id);
  }

  public getNotificationsSettings(): Observable<any> {
    return this.http.get(this.apiRoute + "/getNotificationsSettings");
  }

  public updateNotification(id: number, enabled: boolean, daysReminder: number): Observable<any> {
    return this.http.post(this.apiRoute + "/updateNotificationType", { Id: id, Enabled: enabled, DaysReminder: daysReminder });
  }
}
