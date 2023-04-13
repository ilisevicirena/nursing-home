import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseRestApiService {

  protected apiRoute = '';

  constructor(
    protected http: HttpClient,
    apiRoute: string
  ) {
    this.apiRoute = apiRoute;
  }

}
