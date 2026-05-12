import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonDietaryRestrictionsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/person-dietary-restrictions");
  }

  public getDataForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + personId);
  }

  public getDietaryTypes(): Observable<any> {
    return this.http.get(this.apiRoute + "/types");
  }
}

export interface IPersonDietaryRestriction extends IBaseSaveModel {
  PersonId: number;
  DietaryTypeId: number;
  Restrictions?: string;
  Notes?: string;
  StartDate?: Date;
  EndDate?: Date;
}
