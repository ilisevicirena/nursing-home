import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/persons');
  }

  public getData(active: boolean = true): Observable<any> {
    return this.http.get(this.apiRoute + "?active=" + active);
  }

  public getPersonDetails(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/personDetails?id=" + id);
  }

  public deactivatePerson(id, date: Date = null): Observable<any> {
    return this.http.post(this.apiRoute + "/changeStatusPerson", { Id: id, Active: false, EndDate: date ? date.toISOString() : null });
  }

  public update(model: IPerson): Observable<any> {
    var obj = JSON.parse(JSON.stringify(model))
    return this.http.post(this.apiRoute + '/update', obj);
  }

  public changeRoom(personId: number, roomId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/changeRoomPerson", { PersonId: personId, RoomId: roomId });
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
    FloorName: json.FloorName
  };
}