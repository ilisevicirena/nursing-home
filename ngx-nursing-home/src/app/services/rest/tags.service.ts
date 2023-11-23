import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TagsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/tags");
  }
}

export interface ITag extends IBaseSaveModel {
  Name: string;
  Color: string;
}
