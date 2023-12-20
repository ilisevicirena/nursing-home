import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PriceUnitsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/price-units");
  }
}
