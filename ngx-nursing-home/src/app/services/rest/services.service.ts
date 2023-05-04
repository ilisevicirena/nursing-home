import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/services');
  }

}

export interface IService extends IBaseSaveModel {
  CostPerUnit?: number;
  DefaultNumberOfUnits?: number;
  Description?: string;
  MeasureUnitId?: number;
  MeasureUnitName?: string;
  MeasureUnitTag?: string;
  Name?: string;
  PriceUnitId?: number;
  PriceUnitName?: string;
  PriceUnitTag?: string;
}