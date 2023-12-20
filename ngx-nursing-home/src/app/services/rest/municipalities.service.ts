import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MunicipalitiesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/municipalities");
  }

  private _municipalities: any[] = undefined;

  public get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._municipalities === undefined) {
        this.http.get(this.apiRoute + "/").subscribe(
          (result: any) => {
            this._municipalities = result;
            return resolve(this._municipalities);
          },
          () => reject()
        );
      } else {
        return resolve(this._municipalities);
      }
    });
  }
}
