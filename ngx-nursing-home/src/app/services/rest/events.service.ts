import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root",
})
export class EventsService extends BaseRestApiService {
  constructor(http: HttpClient, private _authService: AuthService) {
    super(http, "api/events");
  }

  public getEvents(month: number, year: number): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "?Month=" +
        month +
        "&Year=" +
        year +
        "&UserId=" +
        this._authService.getUserId()
    );
  }

  public getUserDashboardEvents(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getUserDashboardEvents?UserId=" +
        this._authService.getUserId()
    );
  }
}

export interface IEvent extends IBaseSaveModel {
  Title: string;
  Description: string;
  Start: string;
  End: string;
  Color: string;
  Recurring: boolean;
  Reminder: boolean;
}
