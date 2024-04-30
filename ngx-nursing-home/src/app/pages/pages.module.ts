import { NgModule } from "@angular/core";
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
  NbTooltipModule,
  NbWindowModule,
  NbToggleModule,
  NbButtonGroupModule,
  NbFormFieldModule,
  NbPopoverModule,
  NbStepperModule,
  NbBadgeModule,
  NbAccordionModule,
  NbUserModule,
  NbRadioModule,
  NbProgressBarModule,
} from "@nebular/theme";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedComponentsModule } from "shared-components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoomManagementComponent } from "./room-management/room-management.component";
import { PersonsComponent } from "./persons/persons.component";
import { PersonPopupWindowComponent } from "./person-popup-window/person-popup-window.component";
import { NoDataComponent } from "../shared/no-data/no-data.component";
import { NewPersonComponent } from "./new-person/new-person.component";
import { AccomodationManagementComponent } from "./accomodation-management/accomodation-management.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AdvancedSearchComponent } from "./advanced-search/advanced-search.component";
import { ProfileComponent } from "./profile/profile.component";
import { ContactsGridComponent } from "./contacts-grid/contacts-grid.component";
import { ServicesComponent } from "./services/services.component";
import { PackagesComponent } from "./packages/packages.component";
import { ServicesManagementComponent } from "./services-management/services-management.component";
import { DiscountsComponent } from "./discounts/discounts.component";
import { AddEditServiceComponent } from "./services/add-edit-service/add-edit-service.component";
import { AddEditPackageComponent } from "./packages/add-edit-package/add-edit-package.component";
import { AddEditDiscountComponent } from "./discounts/add-edit-discount/add-edit-discount.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationsSettingsComponent } from "./notifications/notifications-settings/notifications-settings.component";
import { DiscountsPickerComponent } from "./discounts/discounts-picker/discounts-picker.component";
import { PrintInvoiceComponent } from "./print-invoice/print-invoice.component";
import { DocumentsComponent } from "./documents/documents.component";
import { UploadDocumentComponent } from "./documents/upload-document/upload-document.component";
import { NotesComponent } from "./notes/notes.component";
import { NewNoteComponent } from "./notes/new-note/new-note.component";
import { NgxSummernoteModule } from "ngx-summernote";
import { NoteTagsComponent } from "./notes/note-tags/note-tags.component";
import { NoteDocumentsComponent } from "./notes/note-documents/note-documents.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { AddEditEventComponent } from "./calendar/add-edit-event/add-edit-event.component";
import { FastActionsComponent } from "./fast-actions/fast-actions.component";
import { DoctorVisitTourComponent } from "./doctor-visit-tour/doctor-visit-tour.component";
import { CalculationComponent } from "./calculation/calculation.component";
import { StartCalculationComponent } from "./calculation/start-calculation/start-calculation.component";
import { GeneratedInvoiceComponent } from "./calculation/generated-invoice/generated-invoice.component";
import { NgxEchartsModule } from "ngx-echarts";
import { CalculationSummaryComponent } from "./calculation/calculation-summary/calculation-summary.component";
import { RealPriceModalComponent } from "./calculation/real-price-modal/real-price-modal.component";
import { PaidCalculationModalComponent } from "./calculation/paid-calculation-modal/paid-calculation-modal.component";
import { CalculationDocumentsComponent } from "./calculation/calculation-documents/calculation-documents.component";
import { PersonCalculationComponent } from "./profile/person-calculation/person-calculation.component";
import { NoteExportComponent } from "./notes/note-export/note-export.component";
import { TagsComponent } from "./tags/tags.component";
import { CategoriesChooserComponent } from "./categories-chooser/categories-chooser.component";
import { PersonBasicDataComponent } from "./person-basic-data/person-basic-data.component";
import { MunicipalitiesComponent } from "./municipalities/municipalities.component";
import { CitiesComponent } from "./cities/cities.component";
import { EmployeesComponent } from "./employees/employees.component";
import { NewEmployeeComponent } from "./new-employee/new-employee.component";
import { EmployeeBasicDataComponent } from "./employee-basic-data/employee-basic-data.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeVacationsComponent } from "./employee/employee-vacations/employee-vacations.component";
import { NewVacationComponent } from "./employee/new-vacation/new-vacation.component";
import { ChangeVacationStatusComponent } from "./employee/change-vacation-status/change-vacation-status.component";
import { CategoriesComponent } from "./categories/categories.component";
import { StartDoctorVisitTourComponent } from "./start-doctor-visit-tour/start-doctor-visit-tour.component";
import { DoctorVisitsComponent } from "./doctor-visits/doctor-visits.component";
import { DoctorVisitDetailsComponent } from "./doctor-visits/doctor-visit-details/doctor-visit-details.component";
import { FurnitureStatusesComponent } from './furniture-statuses/furniture-statuses.component';
import { FurnitureComponent } from './furniture/furniture.component';

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
    NgxSummernoteModule,
    NbRadioModule,
    NbProgressBarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
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
    NoteTagsComponent,
    NoteDocumentsComponent,
    CalendarComponent,
    AddEditEventComponent,
    FastActionsComponent,
    DoctorVisitTourComponent,
    CalculationComponent,
    StartCalculationComponent,
    GeneratedInvoiceComponent,
    CalculationSummaryComponent,
    RealPriceModalComponent,
    PaidCalculationModalComponent,
    CalculationDocumentsComponent,
    PersonCalculationComponent,
    NoteExportComponent,
    TagsComponent,
    CategoriesChooserComponent,
    PersonBasicDataComponent,
    MunicipalitiesComponent,
    CitiesComponent,
    EmployeesComponent,
    NewEmployeeComponent,
    EmployeeBasicDataComponent,
    EmployeeComponent,
    EmployeeVacationsComponent,
    NewVacationComponent,
    ChangeVacationStatusComponent,
    CategoriesComponent,
    StartDoctorVisitTourComponent,
    DoctorVisitsComponent,
    DoctorVisitDetailsComponent,
    FurnitureStatusesComponent,
    FurnitureComponent,
  ],
})
export class PagesModule {}
