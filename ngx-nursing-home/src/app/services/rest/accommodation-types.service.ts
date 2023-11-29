import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccommodationTypesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/accommodation-types");
  }

  public insertForPerson(
    personId: number,
    accommodationTypeId: number
  ): Observable<any> {
    return this.http.post(this.apiRoute + "/insertForPerson", {
      AccommodationTypeId: accommodationTypeId,
      PersonId: personId,
    });
  }

  public getForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getForPerson?PersonId=" + personId);
  }
}
