import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CitiesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/cities");
  }

  private _cities: any[] = undefined;

  public get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._cities === undefined) {
        this.http.get(this.apiRoute + "/").subscribe(
          (result: any) => {
            this._cities = result;
            return resolve(this._cities);
          },
          () => reject()
        );
      } else {
        return resolve(this._cities);
      }
    });
  }
}
