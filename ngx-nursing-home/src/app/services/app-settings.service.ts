import { Injectable } from "@angular/core";
import { GeneralSettingsService } from "./rest/general-settings.service";

@Injectable({ providedIn: "root" })
export class AppSettingsService {
  public currencySymbol = "KM";
  public language = "";

  constructor(private _settings: GeneralSettingsService) {}

  public async load(): Promise<void> {
    try {
      const c = await this._settings.getGeneralSetting("currency").toPromise();
      if (c?.[0]?.Value) this.currencySymbol = String(c[0].Value).trim();

      const l = await this._settings.getGeneralSetting("language").toPromise();
      if (l?.[0]?.Value) this.language = String(l[0].Value).trim();
    } catch {
      // settings unavailable (e.g. not seeded yet) — keep defaults
    }
  }
}
