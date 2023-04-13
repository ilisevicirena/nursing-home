import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { SharedComponentsModule } from 'shared-components';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbSelectModule,
    SharedComponentsModule
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
