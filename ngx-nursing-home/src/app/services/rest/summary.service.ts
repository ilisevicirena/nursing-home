import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SummaryService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/summary");
  }

  public getDashboardSummary(): Observable<any> {
    return this.http.get(this.apiRoute + "/getDashboardSummary");
  }
}
