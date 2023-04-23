import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/rooms');
  }

  public getData(capacity: boolean = false): Observable<any> {
    return this.http.get(this.apiRoute + "?UseCapacity=" + capacity);
  }

  public getRoomsForFloor(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getRoomsForFloor?FloorId=" + id);
  }

  public getAvaliableRooms(): Observable<any> {
    return this.http.get(this.apiRoute + "/getAvaliableRooms");
  }
}

export interface IRoom extends IBaseSaveModel {
  Name?: string;
  Capacity?: number;
  FloorId?: number;
}