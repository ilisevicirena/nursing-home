import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  private _apiBaseUrl: string;

  constructor(private _configService: ConfigService) {
    this._apiBaseUrl = this._configService.getAppConfig().ApiServiceUrl;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authReq = req.clone({
      //  headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getAccessTokenValue()).set('Request-Date', new Date().toISOString()),
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
        }
      )
    );
  }
}
