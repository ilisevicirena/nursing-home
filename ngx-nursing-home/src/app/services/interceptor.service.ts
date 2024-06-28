import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  private _apiBaseUrl: string;

  constructor(private _configService: ConfigService) {
    this.initializeBaseUrl();
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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this._apiBaseUrl) {
      const authReq = req.clone({
        url: req.url.startsWith("api")
          ? `${this._apiBaseUrl}/${req.url}`
          : req.url,
      });

      return next.handle(authReq).pipe(
        tap(
          (event) => {},
          (error) => {
            console.error(error);
          }
        )
      );
    } else {
      // Handle the case where _apiBaseUrl is not yet initialized
      // For now, just pass the original request through
      return next.handle(req);
    }
  }
}
