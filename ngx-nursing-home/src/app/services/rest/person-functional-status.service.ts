import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonFunctionalStatusService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/person-functional-status");
  }

  public getDataForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + personId);
  }
}

export interface IPersonFunctionalStatus extends IBaseSaveModel {
  PersonId: number;
  MobilityStatus?: string;
  CognitiveStatus?: string;
  FallRisk?: string;
  VisualStatus?: string;
  HearingStatus?: string;
  AssessmentDate?: Date;
  NotesDescription?: string;
}
