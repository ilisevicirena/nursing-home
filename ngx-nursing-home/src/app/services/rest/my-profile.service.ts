import { Injectable } from "@angular/core";
import { BaseRestApiService } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MyProfileService extends BaseRestApiService {
  constructor(http: HttpClient, private _authService: AuthService) {
    super(http, "api/my-profile");
  }

  public getBasicData(): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getBasicData?UserId=" + this._authService.getUserId()
    );
  }

  public getContactInfoForUser(): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getContactInfoForUser?UserId=" +
        this._authService.getUserId()
    );
  }

  public getContactInfoForUserId(userId: string): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getContactInfoForUser?UserId=" + userId
    );
  }
}
