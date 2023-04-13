import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxFilepickerComponent } from './filepicker/filepicker.component';
import { SmartTableInlineComponent } from './smart-table-inline/smart-table-inline.component';
import { SmartTableExternalComponent } from './smart-table-external/smart-table-external.component';
import { SmartTablePopupComponent } from './smart-table-popup/smart-table-popup.component';
import { FileCardsComponent } from './file-cards/file-cards.component';
import { ProgressbarSpinnerComponent } from './progressbar-spinner/progressbar-spinner.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { GridSelectComponent } from './grid-select/grid-select.component';
import { SmartTablePostavkeComponent } from './smart-table-postavke/smart-table-postavke.component';
import { CalendarScheduleComponent } from './calendar-schedule/calendar-schedule.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'filepicker',
      component: NgxFilepickerComponent,
    },
    {
      path: 'smart-table-inline',
      component: SmartTableInlineComponent,
    },
    {
      path: 'smart-table-external',
      component: SmartTableExternalComponent,
    },
    {
      path: 'smart-table-popup',
      component: SmartTablePopupComponent,
    },
    {
      path: 'file-cards',
      component: FileCardsComponent,
    },
    {
      path: 'progressbar-spinner',
      component: ProgressbarSpinnerComponent,
    },
    {
      path: 'autocomplete',
      component: AutocompleteComponent,
    },
    {
      path: 'select-grid',
      component: GridSelectComponent,
    },
    {
      path: 'smart-table-postavke',
      component: SmartTablePostavkeComponent,
    },
    {
      path: 'schedule',
      component: CalendarScheduleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
