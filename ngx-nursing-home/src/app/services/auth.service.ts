import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import {
  NbAuthResult,
  NbAuthToken,
  NbTokenService,
  NB_AUTH_STRATEGIES,
} from "@nebular/auth";
import { Observable, of, Subject } from "rxjs";
import { ConfigService } from "./config.service";
import { BaseRestApiService } from "./base-rest-api.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseRestApiService implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _waitingForRefreshToken: boolean = false;
  private _apiBaseUrl: string;

  constructor(
    protected _tokenService: NbTokenService,
    @Inject(DOCUMENT) private _document: Document,
    protected _http: HttpClient,
    @Inject(NB_AUTH_STRATEGIES) protected _strategies,
    protected _configService: ConfigService
  ) {
    super(_http, "authentication");
    this.initializeBaseUrl();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeBaseUrl() {
    if (this._configService.isConfigured()) {
      this._apiBaseUrl = this._configService.getAppConfig().ApiServiceUrl;
    } else {
      // Optionally, you can subscribe to an observable or use another approach to wait for initialization
      // For simplicity, we're handling it synchronously here, but you might need async handling in a real app
      const configInterval = setInterval(() => {
        if (this._configService.isConfigured()) {
          clearInterval(configInterval);
          this._apiBaseUrl = this._configService.getAppConfig().ApiServiceUrl;
        }
      }, 100); // Check every 100ms, adjust as needed
    }
  }

  public login(data: ILoginInfo): Observable<any> {
    return this._http
      .post(this._apiBaseUrl + "/authentication/login", data)
      .pipe(
        tap((response: any) => {
          if (response.Authenticated) {
            // Store the token and user data
            localStorage.setItem("token", response.Token);
            localStorage.setItem("user", JSON.stringify(response.User));
            localStorage.setItem(
              "userRights",
              JSON.stringify({
                Roles: response.Roles,
                Permissions: response.Permissions,
              })
            );
          }
        })
      );
  }

  public logout(): Observable<any> {
    return this._http
      .post(this._apiBaseUrl + "/authentication/logout", {
        user: this.getUserId(),
      })
      .pipe(
        tap(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userRights");
        })
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser(): IUser {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as IUser) : null;
  }

  checkUserHasRole(role: UserRole): boolean {
    const userRights = localStorage.getItem("userRights");
    var rights = userRights ? (JSON.parse(userRights) as IUserRights) : null;
    if (rights) {
      if (rights.Roles.length > 0) {
        var userRoleId = rights.Roles[0].RoleId;
        switch (role) {
          case UserRole.ADMIN:
            return userRoleId == 1;
          case UserRole.USER:
            return userRoleId == 3;
          default:
            return false;
        }
      } else return false;
    } else return false;
  }

  getUserId(): string {
    var user = this.getUser();
    return user ? user.Id : null;
  }

  public resetPassword(data: IResetPasswordInfo): Observable<any> {
    return this._http
      .post(this._apiBaseUrl + "/authentication/resetPassword", data)
      .pipe(tap(() => {}));
  }

  public forgotPassword(data: IForgotPasswordInfo): Observable<any> {
    return this._http
      .post(this._apiBaseUrl + "/authentication/forgotPassword", data)
      .pipe(tap(() => {}));
  }

  public setPassword(data: ISetPasswordInfo): Observable<any> {
    return this._http
      .post(this._apiBaseUrl + "/authentication/setPassword", data)
      .pipe(tap(() => {}));
  }
}

export interface ILoginInfo {
  Identifier: string;
  Password: string;
}

export interface IUser {
  Id: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Email: string;
  DateRegistered: string;
}

export interface IResetPasswordInfo {
  UserId: string;
  OldPassword: string;
  NewPassword: string;
}

export interface IForgotPasswordInfo {
  Email: string;
  Subject: string;
  Message: string;
  AppUrl: string;
  Brand: string;
}

export interface ISetPasswordInfo {
  Token: string;
  NewPassword: string;
}

export interface IUserRights {
  Roles: any[];
  Permissions: any[];
}

export enum UserRole {
  ADMIN,
  USER,
  NURSE,
  CAREGIVER,
  DOCTOR,
  OTHER_STUFF,
  MODERATOR,
}
