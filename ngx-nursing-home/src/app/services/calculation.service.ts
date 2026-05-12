import { Injectable } from "@angular/core";
import { IPackage } from "./rest/packages.service";
import { IService } from "./rest/services.service";
import { IDiscount } from "./rest/discounts.service";

@Injectable({
  providedIn: "root",
})
export class CalculationService {
  private readonly _MonthDayNumber: number = 30;
  private readonly _YearDayNumber: number = 365;
  private readonly _YearMonthNumber: number = 12;

  constructor() {}

  public calculatePackagePrice(
    pack: IPackage,
    services: IService[],
    measureUnit: ICalculationMeasureUnit
  ): ICalculationResult {
    var result: ICalculationResult = {
      price: 0,
      priceRounded: "0.00",
      services: [],
    };

    // check if package price calculated or default
    if (pack.PackagePriceCalculated) {
      // extract services by measure unit (group by measure unit code)
      const groups = services.reduce((groups, item) => {
        const group = groups[item.MeasureUnitCode] || [];
        group.push(item);
        groups[item.MeasureUnitCode] = group;
        return groups;
      }, {});

      switch (measureUnit) {
        case ICalculationMeasureUnit.DAY:
          groups[ICalculationMeasureUnit.MONTH]?.map(
            (x: IService) =>
              (x.Price = this.calculateServicePrice(x) / this._MonthDayNumber)
          );
          groups[ICalculationMeasureUnit.YEAR]?.map(
            (x: IService) =>
              (x.Price = this.calculateServicePrice(x) / this._YearDayNumber)
          );
          break;

        case ICalculationMeasureUnit.MONTH:
          groups[ICalculationMeasureUnit.DAY]?.map(
            (x: IService) =>
              (x.Price = this.calculateServicePrice(x) * this._MonthDayNumber)
          );
          groups[ICalculationMeasureUnit.YEAR]?.map(
            (x: IService) =>
              (x.Price = this.calculateServicePrice(x) / this._YearMonthNumber)
          );
          break;

        case ICalculationMeasureUnit.YEAR:
          groups[ICalculationMeasureUnit.DAY]?.map(
            (x: IService) =>
              (x.Price = this.calculateServicePrice(x) * this._YearDayNumber)
          );
          groups[ICalculationMeasureUnit.MONTH]?.map(
            (x: IService) =>
              (x.Price = this.calculateServicePrice(x) * this._YearMonthNumber)
          );
          break;
      }

      groups[measureUnit]?.map(
        (x: IService) => (x.Price = this.calculateServicePrice(x))
      );
      groups["unit"]?.map((x) => (x.Price = this.calculateServicePrice(x)));

      Object.keys(groups).forEach((key) => {
        var group = groups[key];
        group.forEach((element) => {
          result.price += element.Price;
          element.PriceRounded = this.roundPriceTwoDecimals(element.Price);
          result.services.push(element);
        });
      });
    } else {
      if (pack.DefaultPackagePrice) {
        result.price = parseFloat(
          pack.DefaultPackagePrice.toString().replace(",", "")
        );
      }
      result.services = services.map((x) => {
        x.PriceRounded = "-";
        return x;
      });
    }

    result.priceRounded = this.roundPriceTwoDecimals(result.price);

    return result;
  }

  private roundPriceTwoDecimals(price: number): string {
    return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  public roundToTwoDecimals(num: number): string {
    return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  public calculateServicePrice(service: IService): number {
    return service.Quantity * service.CostPerUnit;
  }

  public calculateServicePriceRounded(service: IService): string {
    return this.roundPriceTwoDecimals(service.Quantity * service.CostPerUnit);
  }

  public calculateOfferPrice(
    selectedPackages: IPackage[],
    selectedServices: IService[],
    selectedDiscounts: IDiscount[]
  ): ICalculationResult {
    var result: ICalculationResult = {
      price: 0,
      priceRounded: "0.00",
      services: [],
    };

    selectedPackages.forEach((element) => {
      result.price += element.Price;
    });

    selectedServices.forEach((element) => {
      result.price += element.Price;
    });

    // calculate discounts
    if (selectedDiscounts.length > 0) {
      selectedDiscounts.forEach((element) => {
        if (element.PercentCalculation) {
          var totalDiscount = (result.price * element.Quantity) / 100;
          result.price -= totalDiscount;
        } else result.price -= element.Quantity;
      });

      if (result.price < 0) result.price = 0;
    }

    result.priceRounded = this.roundPriceTwoDecimals(result.price);

    return result;
  }

  public calculateServicePriceByMeasureUnit(
    service: IService,
    measureUnit: ICalculationMeasureUnit
  ): ICalculationResult {
    var result: ICalculationResult = {
      price: 0,
      priceRounded: "0.00",
      services: [],
    };

    result.price = this.calculateServicePrice(service);
    //result.priceRounded = this.calculateServicePriceRounded(service);

    switch (measureUnit) {
      case ICalculationMeasureUnit.DAY:
        switch (service.MeasureUnitCode) {
          case ICalculationMeasureUnit.MONTH:
            result.price = result.price / this._MonthDayNumber;
            break;

          case ICalculationMeasureUnit.YEAR:
            result.price = result.price / this._YearDayNumber;
            break;
        }
        break;

      case ICalculationMeasureUnit.MONTH:
        switch (service.MeasureUnitCode) {
          case ICalculationMeasureUnit.DAY:
            result.price = result.price * this._MonthDayNumber;
            break;

          case ICalculationMeasureUnit.YEAR:
            result.price = result.price / this._YearMonthNumber;
            break;
        }
        break;

      case ICalculationMeasureUnit.YEAR:
        switch (service.MeasureUnitCode) {
          case ICalculationMeasureUnit.DAY:
            result.price = result.price * this._YearDayNumber;
            break;

          case ICalculationMeasureUnit.MONTH:
            result.price = result.price + this._YearMonthNumber;
            break;
        }
        break;
    }

    result.priceRounded = this.roundPriceTwoDecimals(result.price);

    return result;
  }
}

export enum ICalculationMeasureUnit {
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}
export interface ICalculationResult {
  price: number;
  priceRounded: string;
  services: IService[];
}
