/**
 * DEMO MODE interceptor.
 *
 * When environment.demo is true, this short-circuits every API request and answers it from the
 * seeded in-memory data in demo-data.ts — so the app runs with no backend and no database.
 *
 * It is registered BEFORE the real InterceptorService, so mocked requests never reach the network
 * or the auth/token logic. When environment.demo is false (normal/production builds) it is a
 * transparent pass-through and does nothing.
 *
 * Requests for local assets (config.json, translations) go through HttpBackend and never reach
 * interceptors, so they are unaffected.
 */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ConfigService } from "../../services/config.service";
import { getMock } from "./demo-data";

@Injectable()
export class DemoInterceptor implements HttpInterceptor {
  constructor(private _configService: ConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(environment as any).demo) {
      return next.handle(req); // no-op in normal/production builds
    }

    const rawUrl = req.url.split("?")[0];
    const apiBase = this._configService.isConfigured()
      ? this._configService.getAppConfig().ApiServiceUrl
      : "";

    // Only handle API traffic; let anything else (assets, etc.) pass through.
    const isApiCall =
      rawUrl.startsWith("api") ||
      rawUrl.includes("/authentication/") ||
      (apiBase && rawUrl.startsWith(apiBase));
    if (!isApiCall) {
      return next.handle(req);
    }

    // Normalise to a logical path: strip base url and a leading "api/".
    let path = rawUrl;
    if (apiBase && path.startsWith(apiBase)) path = path.substring(apiBase.length);
    path = path.replace(/^\/+/, "").replace(/^api\//, "");

    const query = this.parseQuery(req.url);
    const result = getMock(req.method, path, query, req.body);

    if (!result.matched && !environment.production) {
      // Helpful during development of the demo; silent in production demo build.
      // eslint-disable-next-line no-console
      console.debug("[DemoMode] unmocked:", req.method, path, "→ default response");
    }

    return of(
      new HttpResponse({ status: 200, body: result.body, url: req.url })
    ).pipe(delay(150)); // small delay so spinners/loaders behave like a real network
  }

  private parseQuery(url: string): Record<string, string> {
    const out: Record<string, string> = {};
    const qi = url.indexOf("?");
    if (qi === -1) return out;
    url
      .substring(qi + 1)
      .split("&")
      .forEach((pair) => {
        const [k, v] = pair.split("=");
        if (k) out[decodeURIComponent(k)] = decodeURIComponent(v || "");
      });
    return out;
  }
}
