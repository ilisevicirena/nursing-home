import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class JobPositionsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/job-positions");
  }
}
