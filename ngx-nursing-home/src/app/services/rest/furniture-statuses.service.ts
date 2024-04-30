import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FurnitureStatusesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/furniture-statuses");
  }
}

export interface IFurnitureStatus extends IBaseSaveModel {
  Name: string;
  Color: string;
  Icon: string;
}
