import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonAllergensService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/person-allergens");
  }

  public getDataForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + personId);
  }

  public getAllergenSeverities(): Observable<IAllergenSeverity[]> {
    return this.http.get<IAllergenSeverity[]>(this.apiRoute + "/severities/all");
  }
}

export interface IPersonAllergen extends IBaseSaveModel {
  PersonId: number;
  AllergenName: string;
  ReactionDescription?: string;
  SeverityId?: number;
  SeverityName?: string;
  SeverityStringKey?: string;
  SeverityColor?: string;
  StartDate?: Date;
  EndDate?: Date;
  IsActive?: boolean;
}

export interface IAllergenSeverity {
  Id: number;
  Name: string;
  StringKey: string;
  Color: string;
}
