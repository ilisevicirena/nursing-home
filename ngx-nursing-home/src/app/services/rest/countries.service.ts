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

  private countries: any[] = undefined;

  public get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.countries === undefined) {
        this.http.get(this.apiRoute + "/").subscribe(
          (result: any) => {
            this.countries = result;
            return resolve(this.countries);
          },
          () => reject()
        );
      } else {
        return resolve(this.countries);
      }
    });
  }
}
