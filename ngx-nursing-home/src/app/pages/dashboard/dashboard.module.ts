import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbProgressBarModule, NbSelectModule, NbTabsetModule, NbTagModule, NbUserModule } from '@nebular/theme';
import { SharedComponentsModule } from 'shared-components';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbSelectModule,
    SharedComponentsModule,
    NbIconModule,
    NbProgressBarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NbTagModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [

  ],
  exports: [

  ]
})
export class DashboardModule { }
