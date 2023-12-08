import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonCategoriesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/person-categories");
  }

  public insertForPerson(
    personId: number,
    personCategoryId: number
  ): Observable<any> {
    return this.http.post(this.apiRoute + "/insertForPerson", {
      PersonCategoryId: personCategoryId,
      PersonId: personId,
    });
  }

  public getForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getForPerson?PersonId=" + personId);
  }

  public getTemplate(): Observable<any> {
    return this.http.get(this.apiRoute + "/generateTemplate");
  }
}
