import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root",
})
export class AccommodationPdfRequestService extends BaseRestApiService {
  constructor(http: HttpClient, private _authService: AuthService) {
    super(http, "api/accommodation-pdf-request");
  }

  public generateRequest(personId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/generateRequest", {
      city: environment.brand.City,
      id: personId,
      userId: this._authService.getUserId(),
    });
  }
}
