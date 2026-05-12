import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonInsuranceService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/person-insurance");
  }

  public getDataForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + personId);
  }
}

export interface IPersonInsuranceData extends IBaseSaveModel {
  PersonId: number;
  InsuranceCompany?: string;
  PolicyNumber?: string;
  GroupNumber?: string;
  CoverageStartDate?: Date;
  CoverageEndDate?: Date;
  CoverageType?: string;
  Status?: string;
}
