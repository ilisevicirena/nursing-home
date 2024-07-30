import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeneralSettingsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/general-settings");
  }

  public updateGeneralSetting(tag: string, value: string): Observable<any> {
    return this.http.post(this.apiRoute + "/updateGeneralSetting", {
      Tag: tag,
      Value: value,
    });
  }

  public getGeneralSetting(name: string): Observable<any> {
    return this.http.get(this.apiRoute + "/getGeneralSetting?Name=" + name);
  }
}
