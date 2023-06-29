import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationApiService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/calculation');
  }

  public getCalculations(month: number, year: number): Observable<any> {
    return this.http.get(this.apiRoute + "/calculations?Month=" + month + "&Year=" + year);
  }

  public getCalculationStatuses(): Observable<any> {
    return this.http.get(this.apiRoute + "/getCalculationStatuses");
  }

  public saveDocument(model: IBaseSaveModel): Observable<any> {
    return this.http.post(this.apiRoute + '/insertDocumentForCalculation', model);
  }

  public checkCalculationExists(model: any): Observable<any> {
    return this.http.post(this.apiRoute + '/checkCalculationExists', model);
  }
}
