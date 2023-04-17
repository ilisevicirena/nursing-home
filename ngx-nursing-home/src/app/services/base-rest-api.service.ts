import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseRestApiService {

  public apiRoute = '';

  constructor(
    protected http: HttpClient,
    apiRoute: string
  ) {
    this.apiRoute = apiRoute;
  }

  public getData(): Observable<any> {
    return this.http.get(this.apiRoute);
  }

  public add(model: IBaseSaveModel): Observable<any> {
    return this.http.post(this.apiRoute + '/add', model);
  }

  public delete(model: IBaseSaveModel): Observable<any> {
    return this.http.delete(this.apiRoute + '/delete', { body: model });
  }

  public update(model: IBaseSaveModel): Observable<any> {
    return this.http.post(this.apiRoute + '/update', model);
  }
}

export interface IBaseSaveModel {
  Id?: number;
}