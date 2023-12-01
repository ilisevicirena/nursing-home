import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VacationsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/vacations");
  }

  public getVacationsForPerson(
    id: number,
    year: number = null
  ): Observable<any> {
    return this.http.get(
      this.apiRoute + "/vacatonsForEmployee?EmployeeId=" + id + "&Year=" + year
    );
  }

  public changeVacationStatus(id: number, statusId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/changeVacationStatus", {
      Id: id,
      StatusId: statusId,
    });
  }

  public getRemainingVacationDays(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getRemainingVacationDays?EmployeeId=" + id
    );
  }
}

export interface IVacation extends IBaseSaveModel {
  EmployeeId: number;
  Year: number;
  FromDate: Date;
  ToDate: Date;
  DaysTaken: number;
  DaysTotal: number;
  StatusId: number;
}
