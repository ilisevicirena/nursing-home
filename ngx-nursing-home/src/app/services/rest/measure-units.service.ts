import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MeasureUnitsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/measure-units");
  }

  public getCalculationMeasureUnits(): Observable<any> {
    return this.http.get(this.apiRoute + "/getCalculationMeasureUnits");
  }
}
