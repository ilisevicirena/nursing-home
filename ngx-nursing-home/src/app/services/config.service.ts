import { HttpClient, HttpBackend } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NB_AUTH_OPTIONS } from "@nebular/auth";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private _AppConfig: IAppWebConfig;
  private _http: HttpClient;

  constructor(
    private _httpBackend: HttpBackend,
    protected _httpApiClient: HttpClient,
    @Inject(NB_AUTH_OPTIONS)
    protected options = {}
  ) {
    this._http = new HttpClient(this._httpBackend);
  }

  public getAppConfig(): IAppWebConfig {
    return this._AppConfig;
  }

  public load(url: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this._http.get<IAppWebConfig>(url).subscribe((config: IAppWebConfig) => {
        this._AppConfig = config;
        resolve();
      });
    });
  }
}

export interface IAppWebConfig {
  ApiServiceUrl: string;
}

export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile);
}
