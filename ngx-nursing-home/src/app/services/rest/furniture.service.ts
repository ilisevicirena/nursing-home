import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FurnitureService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/furniture");
  }

  public getFurnitureCountByStatus(): Observable<any> {
    return this.http.get(this.apiRoute + "/getFurnitureCountByStatus");
  }
}
