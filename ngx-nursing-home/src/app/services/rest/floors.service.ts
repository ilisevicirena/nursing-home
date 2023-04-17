import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/floors');
  }

}

export interface IFloor extends IBaseSaveModel {
  Name?: string;
}