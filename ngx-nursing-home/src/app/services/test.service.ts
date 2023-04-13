import { Injectable } from '@angular/core';
import { BaseRestApiService } from './base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/orders');
  }

  public getData(): Observable<any> {
    return this.http.get(this.apiRoute)
      .pipe(map(res => res as any));
  }
}
