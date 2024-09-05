import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/contacts");
  }

  public getDataForPerson(personId: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + personId);
  }
}

export interface IContact extends IBaseSaveModel {
  FirstName: string;
  LastName: string;
  Email?: string;
  Telephone?: string;
  Mobile?: string;
  PersonId: number;
  Jmbg?: string;
  ResidanceCityId?: number;
  ResidanceStreetName?: string;
  ResidanceHouseNumber?: string;
  IsObligeeToPay?: boolean;
  IsGuardian?: boolean;
  UserId?: string;
}
