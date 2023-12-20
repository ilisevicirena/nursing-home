import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DiscountsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/discounts");
  }
}

export interface IDiscount extends IBaseSaveModel {
  Name?: string;
  Description?: string;
  Quantity?: number;
  PercentCalculation?: boolean;
}
