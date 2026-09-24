import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";

@Injectable({
  providedIn: "root",
})
export class CarePlanService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/care-plan");
  }

  public getAssessments(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "/assessments?PersonId=" + personId);
  }
}

export interface IAssessment extends IBaseSaveModel {
  PersonId: number;
  AssessmentDate?: Date | string;
  BradenScore?: number; // 6-23, lower = higher pressure-injury risk
  FallRiskScore?: number; // 0-100 (Morse-like), higher = higher fall risk
  MobilityScore?: number; // 0-100, higher = more independent
  NutritionScore?: number; // 0-100, higher = better nutrition
  Notes?: string;
  AssessorName?: string;
}
