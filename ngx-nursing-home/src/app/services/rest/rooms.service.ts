import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/rooms');
  }
}

export interface IRoom extends IBaseSaveModel {
  Name?: string;
  Capacity?: number;
  FloorId?: number;
}