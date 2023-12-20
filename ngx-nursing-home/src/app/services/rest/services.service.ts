import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServicesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/services");
  }

  public getServicesForPackage(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getServicesForPackage?PackageId=" + id
    );
  }
}

export interface IService extends IBaseSaveModel {
  CostPerUnit?: number;
  DefaultNumberOfUnits?: number;
  Description?: string;
  MeasureUnitId?: number;
  MeasureUnitName?: string;
  MeasureUnitTag?: string;
  Name?: string;
  PriceUnitId?: number;
  PriceUnitName?: string;
  PriceUnitTag?: string;
  Quantity?: number;
  Price?: number;
  MeasureUnitCode?: string;
  PriceRounded?: string;
}
