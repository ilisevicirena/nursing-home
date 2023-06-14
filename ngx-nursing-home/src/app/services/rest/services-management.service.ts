import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesManagementService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/services-management');
  }

  public getPackagesAndServicesForPerson(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getPackageAndServicesForPerson?PersonId=" + id);
  }
}

export interface IServicesManagement extends IBaseSaveModel {
  PersonId: number;
  Packages: any[];
  Services: any[];
  Discounts: any[];
  MeasureUnitId: number;
}