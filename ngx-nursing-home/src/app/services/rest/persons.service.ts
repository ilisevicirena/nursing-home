import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonsService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/persons");
  }

  public getData(active: boolean = true): Observable<any> {
    return this.http.get(this.apiRoute + "?active=" + active);
  }

  public getActivePersonsByMonthYear(
    month: number,
    year: number
  ): Observable<any> {
    return this.http.get(
      this.apiRoute +
        "/getActivePersonsByMonthYear?Month=" +
        month +
        "&Year=" +
        year
    );
  }

  public getPersonDetails(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/personDetails?id=" + id);
  }

  public getPersonDetailed(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/personDetailed?id=" + id);
  }

  public deactivatePerson(id: number, date: Date = null): Observable<any> {
    return this.http.post(this.apiRoute + "/changeStatusPerson", {
      Id: id,
      Active: false,
      EndDate: date ? date.toISOString() : null,
    });
  }

  public update(model: IPerson): Observable<any> {
    var obj = JSON.parse(JSON.stringify(model));
    return this.http.post(this.apiRoute + "/update", obj);
  }

  public updateDetailed(model: IPerson): Observable<any> {
    var obj = JSON.parse(JSON.stringify(model));
    return this.http.post(this.apiRoute + "/updateDetailed", obj);
  }

  public add(model: IPerson): Observable<any> {
    var obj = JSON.parse(JSON.stringify(model));
    return this.http.post(this.apiRoute + "/add", obj);
  }

  public changeRoom(personId: number, roomId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/changeRoomPerson", {
      PersonId: personId,
      RoomId: roomId,
    });
  }

  public deactivateRoom(personId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/deactivateRoomPerson", {
      PersonId: personId,
    });
  }

  public searchPersons(searchTerm: string): Observable<any> {
    return this.http.get(
      this.apiRoute + "/searchPersons?searchTerm=" + searchTerm
    );
  }

  public getHistory(personId: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getLogForPerson?PersonId=" + personId
    );
  }

  public getRoomHistory(personId: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/roomsHistoryForPerson?PersonId=" + personId
    );
  }
}

export interface IPerson extends IBaseSaveModel {
  FirstName: string;
  LastName: string;
  JMBG: string;
  BirthDate?: Date;
  StartDate?: Date;
  EndDate?: Date;
  Active: boolean;
  CreationDate: Date | string;
  RoomId?: number;
  RoomName?: string;
  FloorId?: number;
  FloorName?: string;
  Address?: string;
  GenderId?: number;
  GenderName?: string;
  GenderTag?: string;
  MaidenLastName?: string;
  FatherFirstName?: string;
  MotherFirstName?: string;
  MotherMaidenLastName?: string;
  BirthCityId?: number;
  BirthMunicipalityId?: number;
  BirthCountryId?: number;
  ResidanceCityId?: number;
  ResidanceStreetName?: string;
  ResidanceHouseNumber?: string;
  Telephone?: string;
  Mobile?: string;
  Email?: string;
  DoctorName?: string;
}

export function getIPersonFromJSON(json: any): IPerson {
  return {
    Id: json.Id,
    FirstName: json.FirstName,
    LastName: json.LastName,
    JMBG: json.JMBG,
    Active: json.Active,
    CreationDate: json.CreationDate ? new Date(json.CreationDate) : undefined,
    StartDate: json.StartDate ? new Date(json.StartDate) : undefined,
    EndDate: json.EndDate ? new Date(json.EndDate) : undefined,
    BirthDate: json.BirthDate ? new Date(json.BirthDate) : undefined,
    RoomId: json.RoomId,
    RoomName: json.RoomName,
    FloorId: json.FloorId,
    FloorName: json.FloorName,
    Address: json.Address,
    GenderId: json.GenderId,
    GenderName: json.GenderName,
    GenderTag: json.GenderTag,
    MaidenLastName: json.MaidenLastName,
    FatherFirstName: json.FatherFirstName,
    MotherFirstName: json.MotherFirstName,
    MotherMaidenLastName: json.MotherMaidenLastName,
    BirthCityId: json.BirthCityId,
    BirthCountryId: json.BirthCountryId,
    BirthMunicipalityId: json.BirthMunicipalityId,
    ResidanceCityId: json.ResidanceCityId,
    ResidanceStreetName: json.ResidanceStreetName,
    ResidanceHouseNumber: json.ResidanceHouseNumber,
    Telephone: json.Telephone,
    Mobile: json.Mobile,
    Email: json.Email,
    DoctorName: json.DoctorName,
  };
}
