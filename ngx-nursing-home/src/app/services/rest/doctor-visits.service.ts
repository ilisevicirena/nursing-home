import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoctorVisitsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/doctor-visits");
  }

  public getDoctorsAndNurses(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getDoctorsAndNurses?id=" + id);
  }

  public getPersons(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getPersons?id=" + id);
  }

  public getSummary(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getSummary?id=" + id);
  }

  public getNotesForDoctorVisitTour(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getNotesForDoctorVisitTour?id=" + id
    );
  }

  public getVisitTourDetails(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getVisitTourDetails?id=" + id);
  }

  public completeDoctorVisit(id: number, total: number): Observable<any> {
    return this.http.post(this.apiRoute + "/completeDoctorVisit", {
      Id: id,
      Total: total,
    });
  }

  public insertDoctorVisitForPerson(
    id: number,
    personId: number,
    noteId: number
  ): Observable<any> {
    return this.http.post(this.apiRoute + "/insertDoctorVisitForPerson", {
      Id: id,
      NoteId: noteId,
      PersonId: personId,
    });
  }
}
