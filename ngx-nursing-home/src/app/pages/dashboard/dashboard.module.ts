import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbSelectModule,
  NbTabsetModule,
  NbTagModule,
  NbTooltipModule,
  NbUserModule,
} from "@nebular/theme";
import { SharedComponentsModule } from "shared-components";
import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";
import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbSelectModule,
    NbTooltipModule,
    NbPopoverModule,
    SharedComponentsModule,
    NbIconModule,
    NbProgressBarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    NbTagModule,
    NbAlertModule,
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [],
})
export class DashboardModule {}
