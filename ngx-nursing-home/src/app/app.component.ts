import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbIconLibraries } from "@nebular/theme";
import { HttpClient } from "@angular/common/http";
import { initializeStrings } from "./resources/strings";
import { environment } from "../environments/environment";
import { IdleService } from "./services/idle.service";

@Component({
  selector: "ngx-app",
  template:
    '<nb-layout><nb-layout-column class="p-0"><router-outlet></router-outlet></nb-layout-column></nb-layout>',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private _iconLibraries: NbIconLibraries,
    private _http: HttpClient,
    private _idleService: IdleService
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
    initializeStrings(this._http, environment.translationFile).subscribe();
  }

  ngOnDestroy(): void {
    this._idleService.ngOnDestroy();
  }
}
