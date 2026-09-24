import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRestApiService } from "../base-rest-api.service";

export interface IAuditFilters {
  Entity?: string;
  Action?: string;
  DateFrom?: string;
  DateTo?: string;
  Search?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuditLogService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/audit-log");
  }

  public getAuditLog(filters: IAuditFilters): Observable<any> {
    return this.http.get(this.apiRoute + this.buildQuery(filters));
  }

  public getUserActivity(filters: IAuditFilters): Observable<any> {
    return this.http.get(this.apiRoute + "/user-activity" + this.buildQuery(filters));
  }

  private buildQuery(filters: IAuditFilters): string {
    const params: string[] = [];
    if (filters.Entity) params.push("Entity=" + encodeURIComponent(filters.Entity));
    if (filters.Action) params.push("Action=" + encodeURIComponent(filters.Action));
    if (filters.DateFrom) params.push("DateFrom=" + filters.DateFrom);
    if (filters.DateTo) params.push("DateTo=" + filters.DateTo);
    if (filters.Search) params.push("Search=" + encodeURIComponent(filters.Search));
    return params.length ? "?" + params.join("&") : "";
  }
}
