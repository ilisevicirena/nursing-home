import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/packages');
  }

}

export interface IPackage extends IBaseSaveModel {
  Name?: string;
  DefaultPackagePrice?: number;
  DefaultPackagePriceUnitId?: number;
  Description?: string;
  PackagePriceCalculated?: boolean;
  PriceUnitName?: string;
  PriceUnitTag?: string;
  MeasureUnitId?: number;
  MesureUnitCode?: string;
  MesureUnitName?: string;
  MeasureUnitTag?: string;
  CalculationMeasureUnitId?: string;
}