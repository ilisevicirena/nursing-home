import { Pipe, PipeTransform } from "@angular/core";
import { AppSettingsService } from "../../services/app-settings.service";

@Pipe({
    name: "appCurrency", pure: false,
    standalone: false
})
export class AppCurrencyPipe implements PipeTransform {
  constructor(private _settings: AppSettingsService) {}

  transform(value: any): string {
    const symbol = this._settings.currencySymbol;
    return value === null || value === undefined || value === ""
      ? symbol
      : `${value} ${symbol}`;
  }
}
