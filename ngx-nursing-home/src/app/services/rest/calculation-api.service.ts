import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CalculationApiService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/calculation");
  }

  public getCalculations(month: number, year: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/calculations?Month=" + month + "&Year=" + year
    );
  }

  public getCalculationSummary(month: number, year: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/calculationSummary?Month=" + month + "&Year=" + year
    );
  }

  public getCalculationStatuses(): Observable<any> {
    return this.http.get(this.apiRoute + "/getCalculationStatuses").pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
  }

  public getCalculationsForPerson(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getCalculationsForPerson?PersonId=" + id
    );
  }

  public getCalculationsSummaryForPerson(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getCalculationsSummaryForPerson?PersonId=" + id
    );
  }

  public getCalculationDocuments(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/calculationDocuments?Id=" + id);
  }

  public saveDocument(model: IBaseSaveModel): Observable<any> {
    return this.http.post(
      this.apiRoute + "/insertDocumentForCalculation",
      model
    );
  }

  public checkCalculationExists(model: any): Observable<any> {
    return this.http.post(this.apiRoute + "/checkCalculationExists", model);
  }

  public calculationRealPriceSave(model: any): Observable<any> {
    return this.http.post(this.apiRoute + "/calculationRealPriceSave", model);
  }

  public calculationPaid(model: any): Observable<any> {
    return this.http.post(this.apiRoute + "/calculationPaid", model);
  }

  public cancelCalculation(model: any): Observable<any> {
    return this.http.post(this.apiRoute + "/cancelCalculation", model);
  }

  public deleteDocumentFromCalculation(
    id: number,
    calculationId: number
  ): Observable<any> {
    return this.http.delete(this.apiRoute + "/deleteDocumentFromCalculation", {
      body: { DocumentId: id, CalculationId: calculationId },
    });
  }
}
