import { Injectable } from '@angular/core';
import { IPackage } from './rest/packages.service';
import { IService } from './rest/services.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private MonthDayNumber: number = 30;
  private YearDayNumber: number = 365;
  private YearMonthNumber: number = 12;

  constructor() { }

  public calculatePackagePrice(selectedPackage: IPackage, services: any[]): ICalculationResult {

    var result: ICalculationResult = {
      day: 0,
      month: 0,
      year: 0
    }

    // calculate price from selected services
    if (selectedPackage.PackagePriceCalculated) {
      var dailyServices = services.filter(x => x.MeasureUnitCode == 'day');
      var monthlyServices = services.filter(x => x.MeasureUnitCode == 'month');
      var yearServices = services.filter(x => x.MeasureUnitCode == 'year');
      var unitServices = services.filter(x => x.MeasureUnitCode == 'unit');

      var dailyServicesPrice = 0;
      dailyServices.forEach(element => {
        dailyServicesPrice += element.Quantity * element.CostPerUnit;
      });

      var monthlyServicesPrice = 0;
      monthlyServices.forEach(element => {
        monthlyServicesPrice += element.Quantity * element.CostPerUnit;
      });

      var yearServicesPrice = 0;
      yearServices.forEach(element => {
        yearServicesPrice += element.Quantity * element.CostPerUnit;
      });

      var unitServicesPrice = 0;
      unitServices.forEach(element => {
        unitServicesPrice += element.Quantity * element.CostPerUnit;
      });


      result.day = dailyServicesPrice + (monthlyServicesPrice / this.MonthDayNumber) + (yearServicesPrice / this.YearDayNumber) + unitServicesPrice;
      result.month = (dailyServicesPrice * this.MonthDayNumber) + monthlyServicesPrice + (yearServicesPrice / this.YearMonthNumber) + unitServicesPrice;
      result.year = (dailyServicesPrice * this.YearDayNumber) + (monthlyServicesPrice * this.YearMonthNumber) + yearServicesPrice + unitServicesPrice;
    }

    // price is default for selected measurement unit, others need to be calculated --> month is calculated on 30 day basis
    else {
      result[selectedPackage.MeasureUnitCode] = selectedPackage.DefaultPackagePrice;
    }

    result.day = (Math.round((result.day as number + Number.EPSILON) * 100) / 100).toFixed(2);
    result.month = (Math.round((result.month as number + Number.EPSILON) * 100) / 100).toFixed(2);
    result.year = (Math.round((result.year as number + Number.EPSILON) * 100) / 100).toFixed(2);

    return result;
  }

  public calculateServicePrice(service: IService): number {
    return service.Quantity * service.CostPerUnit;
  }

}

export interface ICalculationResult {
  day: string | number;
  month: string | number;
  year: string | number;
}