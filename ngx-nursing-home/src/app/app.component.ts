import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbIconLibraries, NbThemeService } from "@nebular/theme";
import { HttpClient } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { initializeStrings } from "./resources/strings";
import { environment } from "../environments/environment";
import { IdleService } from "./services/idle.service";
import { AppSettingsService } from "./services/app-settings.service";

@Component({
  selector: "ngx-app",
  template:
    '<nb-layout><nb-layout-column class="p-0"><router-outlet></router-outlet></nb-layout-column></nb-layout>',
})
export class AppComponent implements OnInit, OnDestroy {
  private _routerSub: Subscription;

  constructor(
    private _iconLibraries: NbIconLibraries,
    private _http: HttpClient,
    private _idleService: IdleService,
    private _router: Router,
    private _themeService: NbThemeService,
    private _appSettings: AppSettingsService
  ) {
    this._iconLibraries.registerFontPack("fas", {
      packClass: "fas",
      iconClassPrefix: "fa",
    });
    this._iconLibraries.registerFontPack("far", {
      packClass: "far",
      iconClassPrefix: "fa",
    });
    this._iconLibraries.registerFontPack("fab", {
      packClass: "fab",
      iconClassPrefix: "fa",
    });
    this._iconLibraries.setDefaultPack("far");
  }

  ngOnInit(): void {
    if (!localStorage.getItem("app-theme"))
      localStorage.setItem("app-theme", "dark");
    initializeStrings(this._http, environment.translationFile).subscribe();

    this._appSettings.load().then(() => {
      if (this._appSettings.language) {
        const file = `assets/resources/strings-${this._appSettings.language}.json`;
        if (file !== environment.translationFile)
          initializeStrings(this._http, file).subscribe();
      }
    });

    // auth pages (login, password change, ...) always render light; everywhere
    // else uses the user's saved theme
    this.applyThemeForUrl(this._router.url);
    this._routerSub = this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) =>
        this.applyThemeForUrl(e.urlAfterRedirects)
      );
  }

  private applyThemeForUrl(url: string): void {
    const isAuth = (url || "").startsWith("/auth");
    this._themeService.changeTheme(
      isAuth ? "default" : localStorage.getItem("app-theme") || "default"
    );
  }

  ngOnDestroy(): void {
    this._idleService.ngOnDestroy();
    this._routerSub?.unsubscribe();
  }
}
