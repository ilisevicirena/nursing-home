import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";

import { CommonModule, registerLocaleData } from "@angular/common";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { SharedComponentsModule } from "shared-components";
import hr from "@angular/common/locales/hr";
import { InterceptorService } from "./services/interceptor.service";
import { ConfigLoader, ConfigService } from "./services/config.service";
import { DialogComponent } from "./shared/dialog/dialog/dialog.component";
import { NgxEchartsModule } from "ngx-echarts";
registerLocaleData(hr);

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    SharedComponentsModule,
    CommonModule,
    NbLayoutModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbButtonModule,
    NbAlertModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: "hr" },
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class AppModule {}
