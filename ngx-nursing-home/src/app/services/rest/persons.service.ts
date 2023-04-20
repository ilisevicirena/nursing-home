import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/persons');
  }

  public getData(active: boolean = true): Observable<any> {
    return this.http.get(this.apiRoute + "?active=" + active);
  }
}
