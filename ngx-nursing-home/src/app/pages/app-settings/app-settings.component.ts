import { Component, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { GeneralSettingsService } from "../../services/rest/general-settings.service";
import { PriceUnitsService } from "../../services/rest/price-units.service";
import { AppSettingsService } from "../../services/app-settings.service";
import { ToastrService } from "../../services/toastr.service";

@Component({
    selector: "sample-app-settings",
    templateUrl: "./app-settings.component.html",
    standalone: false
})
export class AppSettingsComponent implements OnInit {
  public getString = getString;
  public priceUnits: any[] = [];
  public languages = [
    { code: "en", label: "English" },
    { code: "hr", label: "Hrvatski" },
  ];
  public currency = "";
  public language = "";
  public saving = false;

  constructor(
    private _settings: GeneralSettingsService,
    private _priceUnits: PriceUnitsService,
    private _appSettings: AppSettingsService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._priceUnits.getData().subscribe((d) => (this.priceUnits = d || []));
    this._settings
      .getGeneralSetting("currency")
      .subscribe((d) => (this.currency = this.readValue(d)));
    this._settings
      .getGeneralSetting("language")
      .subscribe((d) => (this.language = this.readValue(d)));
  }

  private readValue(d: any): string {
    return d && d[0] && d[0].Value ? String(d[0].Value).trim() : "";
  }

  public save(): void {
    if (!this.currency || !this.language) return;
    this.saving = true;
    this._settings.updateGeneralSetting("currency", this.currency).subscribe(
      () =>
        this._settings
          .updateGeneralSetting("language", this.language)
          .subscribe(() => {
            this._appSettings.currencySymbol = this.currency;
            this._appSettings.language = this.language;
            this.saving = false;
            this._toastr.showToast("success", getString("saveSuccess"), "");
          }, () => this.fail()),
      () => this.fail()
    );
  }

  private fail(): void {
    this.saving = false;
    this._toastr.showToast("danger", getString("saveError"), "");
  }
}
