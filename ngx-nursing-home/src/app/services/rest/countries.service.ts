import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CountriesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/countries");
  }

  private _countries: any[] = undefined;

  public get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._countries === undefined) {
        this.http.get(this.apiRoute + "/").subscribe(
          (result: any) => {
            this._countries = result;
            return resolve(this._countries);
          },
          () => reject()
        );
      } else {
        return resolve(this._countries);
      }
    });
  }
}
