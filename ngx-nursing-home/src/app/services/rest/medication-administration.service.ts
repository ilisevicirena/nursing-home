import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRestApiService } from "../base-rest-api.service";

@Injectable({
  providedIn: "root",
})
export class MedicationAdministrationService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/medication-administration");
  }

  public getSchedule(personId: number, dateIso: string): Observable<any> {
    return this.http.get(
      this.apiRoute + "?PersonId=" + personId + "&Date=" + dateIso
    );
  }

  public recordAdministration(model: IMarRecord): Observable<any> {
    return this.http.post(this.apiRoute + "/record", model);
  }
}

export interface IMarSlot {
  slot: string;
  scheduled: boolean;
  dose: string;
  time: string;
  status: "given" | "missed" | "pending";
}

export interface IMarRow {
  Id: number;
  MedicationName: string;
  Dosage: string;
  Route: string;
  slots: IMarSlot[];
}

export interface IMarRecord {
  PersonId: number;
  MedicationId: number;
  Slot: string;
  Date: string;
  Status: string;
}
