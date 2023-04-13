import { HttpClient, HttpBackend } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private AppConfig: IAppWebConfig;
  private http: HttpClient;

  constructor(httpBackend: HttpBackend, protected httpApiClient: HttpClient, @Inject(NB_AUTH_OPTIONS) protected options = {}) {
    this.http = new HttpClient(httpBackend);
  }

  GetAppConfig(): IAppWebConfig {
    return this.AppConfig;
  }

  load(url: string) {
    return new Promise<void>((resolve) => {
      this.http.get<IAppWebConfig>(url)
        .subscribe((config: IAppWebConfig) => {
          this.AppConfig = config;
          resolve();
        });
    });
  }
}

interface IAppWebConfig {
  ApiServiceUrl: string;
}

export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile);
}
