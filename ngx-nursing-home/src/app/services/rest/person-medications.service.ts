import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonMedicationsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/person-medications");
  }

  public getDataForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + personId);
  }
}

export interface IPersonMedication extends IBaseSaveModel {
  PersonId: number;
  MedicationName: string;
  Dosage?: string;
  Frequency?: string;
  Route?: string;
  StartDate?: Date;
  EndDate?: Date;
  Indication?: string;
  Notes?: string;
  Status: string;
  PrescriberName?: string;
}
