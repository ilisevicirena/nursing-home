import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/users");
  }

  public getUserData(id: string): Observable<any> {
    return this.http.get(this.apiRoute + "/getUserData?UserId=" + id);
  }

  public getUserRoles(id: string): Observable<any> {
    return this.http.get(this.apiRoute + "/roles?UserId=" + id);
  }

  public getRoles(): Observable<any> {
    return this.http.get(this.apiRoute + "/getRoles");
  }

  public checkVerificationTokenForUser(id: string): Observable<any> {
    return this.http.get(
      this.apiRoute + "/checkVerificationTokenForUser?UserId=" + id
    );
  }

  public changeUserRole(id: string, roleId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/changeUserRole", {
      Id: id,
      RoleId: roleId,
    });
  }

  public blockUnblockUser(id: string, blocked: boolean): Observable<any> {
    return this.http.post(this.apiRoute + "/blockUnblockUser", {
      Id: id,
      Blocked: blocked,
    });
  }

  public activateDeactivateUser(id: string, active: boolean): Observable<any> {
    return this.http.post(this.apiRoute + "/activateDeactivateUser", {
      Id: id,
      Active: active,
    });
  }

  public sendVerificationEmail(data: IVerifyUserEmail): Observable<any> {
    return this.http.post(this.apiRoute + "/sendVerificationEmail", data);
  }
}

export interface IUserSaveModel extends IUser {
  ContactId?: number;
  EmployeeId?: number;
}

export interface IVerifyUserEmail {
  Email: string;
  Subject: string;
  Message: string;
  AppUrl: string;
  Brand: string;
  UserId: string;
}
