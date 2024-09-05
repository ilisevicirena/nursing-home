import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { NotificationsService } from "./rest/notifications.service";
import { ToastrService } from "./toastr.service";
import { Router } from "@angular/router";
import { getString } from "../resources/strings";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  private _apiBaseUrl: string;

  constructor(
    private _configService: ConfigService,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this.initializeBaseUrl();
  }

  private initializeBaseUrl() {
    if (this._configService.isConfigured())
      this._apiBaseUrl = this._configService.getAppConfig().ApiServiceUrl;
    else {
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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authReq = req.clone({
      headers: req.headers
        .set("Authorization", "Bearer " + this._authService.getToken())
        .set("Request-Date", new Date().toISOString()),
      url:
        req.url.substring(0, 3) === "api"
          ? `${this._apiBaseUrl}/${req.url}`
          : req.url,
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        (event) => {},
        (error) => {
          console.error(error);

          if (error.url.indexOf("/auth/") === -1) {
            if (
              error.status === 401 &&
              error.error.startsWith("NURSNIG_HOME_AUTH_ERR")
            ) {
              var message = error.error.split("#");
              this._toastrService.showToastPreventDuplicates(
                "danger",
                getString(message[1]),
                ""
              );
            } else if (error.status === 401) {
              this._toastrService.showToastPreventDuplicates(
                "danger",
                getString("authorizationFailed"),
                ""
              );
              setTimeout(() => {
                this._router.navigate(["auth/login"]);
              }, 100);
            } else if (
              error.status === 400 &&
              error.error &&
              Array.isArray(error.error)
            ) {
              this._toastrService.showToastPreventDuplicates(
                "danger",
                getString("error"),
                error.error.join("\n")
              );
            } else if (error.status === 500) {
              this._toastrService.showToastPreventDuplicates(
                "danger",
                getString("error"),
                error.error
              );
            } else {
              this._toastrService.showToastPreventDuplicates(
                "danger",
                getString("error"),
                ""
              );

              setTimeout(() => {
                this._router.navigate(["auth/login"]);
              }, 100);
            }
          }
        }
      )
    );
  }
}
