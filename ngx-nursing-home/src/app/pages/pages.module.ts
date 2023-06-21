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
  NbBadgeModule,
  NbAccordionModule,
  NbUserModule

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
import { ContactsGridComponent } from './contacts-grid/contacts-grid.component';
import { BasicDataComponent } from './profile/basic-data/basic-data.component';
import { ServicesComponent } from './services/services.component';
import { PackagesComponent } from './packages/packages.component';
import { ServicesManagementComponent } from './services-management/services-management.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { AddEditServiceComponent } from './services/add-edit-service/add-edit-service.component';
import { AddEditPackageComponent } from './packages/add-edit-package/add-edit-package.component';
import { AddEditDiscountComponent } from './discounts/add-edit-discount/add-edit-discount.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsSettingsComponent } from './notifications/notifications-settings/notifications-settings.component';
import { DiscountsPickerComponent } from './discounts/discounts-picker/discounts-picker.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { DocumentsComponent } from './documents/documents.component';
import { UploadDocumentComponent } from './documents/upload-document/upload-document.component';
import { NotesComponent } from './notes/notes.component';
import { NewNoteComponent } from './notes/new-note/new-note.component';
import { TagsComponent } from './tags/tags.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NoteTagsComponent } from './notes/note-tags/note-tags.component';
import { NoteDocumentsComponent } from './notes/note-documents/note-documents.component';
import { CalendarComponent } from './calendar/calendar.component';

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
    DragDropModule,
    NbBadgeModule,
    NbAccordionModule,
    NbUserModule,
    NgxSummernoteModule
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
    ProfileComponent,
    ContactsGridComponent,
    BasicDataComponent,
    ServicesComponent,
    PackagesComponent,
    ServicesManagementComponent,
    DiscountsComponent,
    AddEditServiceComponent,
    AddEditPackageComponent,
    AddEditDiscountComponent,
    NotificationsComponent,
    NotificationsSettingsComponent,
    DiscountsPickerComponent,
    PrintInvoiceComponent,
    DocumentsComponent,
    UploadDocumentComponent,
    NotesComponent,
    NewNoteComponent,
    TagsComponent,
    NoteTagsComponent,
    NoteDocumentsComponent,
    CalendarComponent
  ],
})
export class PagesModule {
}
