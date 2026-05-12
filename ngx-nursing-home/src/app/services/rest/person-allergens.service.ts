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
}

export interface IPersonAllergen extends IBaseSaveModel {
  PersonId: number;
  AllergenId: number;
  ReactionDescription?: string;
  Severity: string;
}
