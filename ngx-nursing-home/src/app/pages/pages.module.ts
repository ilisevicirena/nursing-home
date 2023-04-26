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
  NbToggleModule,
  NbButtonGroupModule,
  NbFormFieldModule,
  NbPopoverModule,
  NbStepperModule,

}
  from '@nebular/theme';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedComponentsModule } from 'shared-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomManagementComponent } from './room-management/room-management.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonPopupWindowComponent } from './person-popup-window/person-popup-window.component';
import { NoDataComponent } from '../shared/no-data/no-data.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { AccomodationManagementComponent } from './accomodation-management/accomodation-management.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { ProfileComponent } from './profile/profile.component';

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
    NbToggleModule,
    NbButtonGroupModule,
    NbFormFieldModule,
    NbPopoverModule,
    Ng2SearchPipeModule,
    NbStepperModule,
    DragDropModule
  ],
  declarations: [
    PagesComponent,
    RoomManagementComponent,
    PersonsComponent,
    PersonPopupWindowComponent,
    NoDataComponent,
    NewPersonComponent,
    AccomodationManagementComponent,
    AdvancedSearchComponent,
    ProfileComponent
  ],
})
export class PagesModule {
}
