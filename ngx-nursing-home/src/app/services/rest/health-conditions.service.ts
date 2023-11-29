import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HealthConditionsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/health-conditions");
  }

  public insertForPerson(
    personId: number,
    conditionId: number,
    description: string
  ): Observable<any> {
    return this.http.post(this.apiRoute + "/insertForPerson", {
      HealthConditionId: conditionId,
      PersonId: personId,
      Description: description,
    });
  }

  public getForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getForPerson?PersonId=" + personId);
  }
}
