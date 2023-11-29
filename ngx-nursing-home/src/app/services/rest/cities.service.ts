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

  private cities: any[] = undefined;

  public get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.cities === undefined) {
        this.http.get(this.apiRoute + "/").subscribe(
          (result: any) => {
            this.cities = result;
            return resolve(this.cities);
          },
          () => reject()
        );
      } else {
        return resolve(this.cities);
      }
    });
  }
}
