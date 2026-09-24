import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RoomManagementComponent } from "./room-management/room-management.component";
import { PersonsComponent } from "./persons/persons.component";
import { NewPersonComponent } from "./new-person/new-person.component";
import { AccomodationManagementComponent } from "./accomodation-management/accomodation-management.component";
import { AdvancedSearchComponent } from "./advanced-search/advanced-search.component";
import { ProfileComponent } from "./profile/profile.component";
import { ServicesComponent } from "./services/services.component";
import { PackagesComponent } from "./packages/packages.component";
import { DiscountsComponent } from "./discounts/discounts.component";
import { ServicesManagementComponent } from "./services-management/services-management.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationsSettingsComponent } from "./notifications/notifications-settings/notifications-settings.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { DoctorVisitTourComponent } from "./doctor-visit-tour/doctor-visit-tour.component";
import { CalculationComponent } from "./calculation/calculation.component";
import { TagsComponent } from "./tags/tags.component";
import { CitiesComponent } from "./cities/cities.component";
import { MunicipalitiesComponent } from "./municipalities/municipalities.component";
import { EmployeesComponent } from "./employees/employees.component";
import { NewEmployeeComponent } from "./new-employee/new-employee.component";
import { EmployeeComponent } from "./employee/employee.component";
import { CategoriesComponent } from "./categories/categories.component";
import { DoctorVisitsComponent } from "./doctor-visits/doctor-visits.component";
import { FurnitureStatusesComponent } from "./furniture-statuses/furniture-statuses.component";
import { FurnitureComponent } from "./furniture/furniture.component";
import { UsersComponent } from "./users/users.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserRole } from "../services/auth.service";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { EmployeeVacationsComponent } from "./employee/employee-vacations/employee-vacations.component";
import { MedicationAdministrationComponent } from "./medication-administration/medication-administration.component";
import { CarePlanComponent } from "./care-plan/care-plan.component";
import { AuditLogComponent } from "./audit-log/audit-log.component";
import { MyDataComponent } from "./my-data/my-data.component";

// Breadcrumb metadata carried in route `data` (read by BreadcrumbComponent):
//   breadcrumb : label for this page (translation key, or a literal phrase with spaces)
//   module     : module/group this page belongs to -> renders "home > module > page",
//                the module crumb is non-navigable and reveals its pages on hover.
//                Value is a translation key (matches a MENU_ITEMS group title) or a literal.
//   parent     : base path of a logical parent PAGE for drill-downs (e.g. profile -> persons)
//                -> renders "home > persons > profile". Takes precedence over `module`.
const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { breadcrumb: "dashboard" },
      },
      {
        path: "page-not-found",
        component: PageNotFoundComponent,
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "room-management",
        component: RoomManagementComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "roomManagement",
          module: "accomodationManagement",
        },
      },
      {
        path: "persons",
        component: PersonsComponent,
        data: {
          Roles: [
            UserRole.ADMIN,
            UserRole.NURSE,
            UserRole.CAREGIVER,
            UserRole.DOCTOR,
          ],
          breadcrumb: "persons",
          module: "personsManagement",
        },
      },
      {
        path: "new-person",
        component: NewPersonComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "addPerson",
          module: "personsManagement",
        },
      },
      {
        path: "accomodation-management",
        component: AccomodationManagementComponent,
        data: {
          Roles: [
            UserRole.ADMIN,
            UserRole.NURSE,
            UserRole.DOCTOR,
            UserRole.CAREGIVER,
          ],
          breadcrumb: "accomodationManagementRoom",
          module: "accomodationManagement",
        },
      },
      {
        path: "advanced-search/:search",
        component: AdvancedSearchComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE, UserRole.CAREGIVER, UserRole.DOCTOR],
          breadcrumb: "searchPersons",
          module: "personsManagement",
        },
      },
      {
        path: "advanced-search",
        component: AdvancedSearchComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE, UserRole.CAREGIVER, UserRole.DOCTOR],
          breadcrumb: "searchPersons",
          module: "personsManagement",
        },
      },
      {
        path: "profile/:id",
        component: ProfileComponent,
        data: { breadcrumb: "profile", parent: "persons" },
      },
      {
        path: "services",
        component: ServicesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "servicesSingle",
          module: "servicesManagement",
        },
      },
      {
        path: "packages",
        component: PackagesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "packages",
          module: "servicesManagement",
        },
      },
      {
        path: "discounts",
        component: DiscountsComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "discounts",
          module: "servicesManagement",
        },
      },
      {
        path: "services-management",
        component: ServicesManagementComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "servicesManagementSingle",
          module: "servicesManagement",
        },
      },
      {
        path: "notifications",
        component: NotificationsComponent,
        data: { breadcrumb: "notifications" },
      },
      {
        path: "notifications-settings",
        component: NotificationsSettingsComponent,
        data: { breadcrumb: "notificationsSettings", parent: "notifications" },
      },
      {
        path: "calendar",
        component: CalendarComponent,
        data: { breadcrumb: "calendar" },
      },
      {
        path: "doctor-visit-tour/:id",
        component: DoctorVisitTourComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE],
          breadcrumb: "doctorVisitTour",
          parent: "doctor-visits",
        },
      },
      {
        path: "calculation",
        component: CalculationComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "calculationPage",
        },
      },
      {
        path: "tags",
        component: TagsComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "tagsManagement",
          module: "codebooks",
        },
      },
      {
        path: "cities",
        component: CitiesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "cities",
          module: "codebooks",
        },
      },
      {
        path: "municipalities",
        component: MunicipalitiesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "municipalities",
          module: "codebooks",
        },
      },
      {
        path: "employees",
        component: EmployeesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "employees",
          module: "employeesManagement",
        },
      },
      {
        path: "new-employee",
        component: NewEmployeeComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "addEmployee",
          module: "employeesManagement",
        },
      },
      {
        path: "employee/:id",
        component: EmployeeComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "employee",
          parent: "employees",
        },
      },
      {
        path: "categories",
        component: CategoriesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "categories",
          module: "codebooks",
        },
      },
      {
        path: "doctor-visits",
        component: DoctorVisitsComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE],
          breadcrumb: "doctorVisits",
        },
      },
      {
        path: "furniture-statuses",
        component: FurnitureStatusesComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "furnitureStatuses",
          module: "codebooks",
        },
      },
      {
        path: "furniture",
        component: FurnitureComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "furnitureManagement",
          module: "accomodationManagement",
        },
      },
      {
        path: "users",
        component: UsersComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "users",
          module: "usersManagement",
        },
      },
      {
        path: "my-profile",
        component: MyProfileComponent,
        data: { breadcrumb: "myProfile" },
      },
      {
        path: "my-data",
        component: MyDataComponent,
        data: {
          Roles: [
            UserRole.NURSE,
            UserRole.DOCTOR,
            UserRole.CAREGIVER,
            UserRole.COOK,
            UserRole.OTHER_STUFF,
          ],
          breadcrumb: "myData",
        },
      },
      {
        path: "medication-administration/:id",
        component: MedicationAdministrationComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE, UserRole.DOCTOR],
          breadcrumb: "Medication administration",
          module: "Clinical care",
        },
      },
      {
        path: "medication-administration",
        component: MedicationAdministrationComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE, UserRole.DOCTOR],
          breadcrumb: "Medication administration",
          module: "Clinical care",
        },
      },
      {
        path: "care-plan/:id",
        component: CarePlanComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE, UserRole.DOCTOR],
          breadcrumb: "Care plans & assessments",
          module: "Clinical care",
        },
      },
      {
        path: "care-plan",
        component: CarePlanComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE, UserRole.DOCTOR],
          breadcrumb: "Care plans & assessments",
          module: "Clinical care",
        },
      },
      {
        path: "audit-log",
        component: AuditLogComponent,
        data: {
          Roles: [UserRole.ADMIN],
          breadcrumb: "Audit log",
          module: "usersManagement",
        },
      },
      {
        path: "employee-vacations",
        component: EmployeeVacationsComponent,
        data: {
          Roles: [
            UserRole.ADMIN,
            UserRole.NURSE,
            UserRole.CAREGIVER,
            UserRole.COOK,
            UserRole.OTHER_STUFF,
          ],
          breadcrumb: "vacation",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
