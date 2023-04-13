import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbOverlayModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbToastrModule,
  NbTooltipModule,
  NbWindowModule,
}
  from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedComponentsModule } from 'shared-components';
import { NgxFilepickerComponent } from './filepicker/filepicker.component'
import { SmartTableInlineComponent } from './smart-table-inline/smart-table-inline.component';
import { SmartTableExternalComponent } from './smart-table-external/smart-table-external.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditUserComponent } from './smart-table-external/add-edit-user/add-edit-user.component';
import { SmartTablePopupComponent } from './smart-table-popup/smart-table-popup.component';
import { FileCardsComponent } from './file-cards/file-cards.component';
import { ProgressbarSpinnerComponent } from './progressbar-spinner/progressbar-spinner.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { InputsComponent } from './documentation/inputs/inputs.component';
import { GridSelectComponent } from './grid-select/grid-select.component';
import { SmartTablePostavkeComponent } from './smart-table-postavke/smart-table-postavke.component';
import { CalendarScheduleComponent } from './calendar-schedule/calendar-schedule.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    SharedComponentsModule,
    NbTagModule,
    NbButtonModule,
    NbTooltipModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbMenuModule,
    NbAlertModule,
    NbSelectModule,
    NbDatepickerModule,
    NbIconModule,
    NbListModule,
    NbTabsetModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    NbLayoutModule,
    NbOverlayModule,
    NbWindowModule.forChild(),
  ],
  declarations: [
    PagesComponent,
    NgxFilepickerComponent,
    SmartTableInlineComponent,
    SmartTableExternalComponent,
    AddEditUserComponent,
    SmartTablePopupComponent,
    FileCardsComponent,
    ProgressbarSpinnerComponent,
    AutocompleteComponent,
    InputsComponent,
    GridSelectComponent,
    SmartTablePostavkeComponent,
    CalendarScheduleComponent,
  ],
})
export class PagesModule {
}
