import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/events');
  }

  public getEvents(month: number, year: number): Observable<any> {
    return this.http.get(this.apiRoute + "?Month=" + month + "&Year=" + year);
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