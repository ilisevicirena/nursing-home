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

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "room-management",
        component: RoomManagementComponent,
      },
      {
        path: "persons",
        component: PersonsComponent,
      },
      {
        path: "new-person",
        component: NewPersonComponent,
      },
      {
        path: "accomodation-management",
        component: AccomodationManagementComponent,
      },
      {
        path: "advanced-search",
        component: AdvancedSearchComponent,
      },
      {
        path: "profile/:id",
        component: ProfileComponent,
      },
      {
        path: "services",
        component: ServicesComponent,
      },
      {
        path: "packages",
        component: PackagesComponent,
      },
      {
        path: "discounts",
        component: DiscountsComponent,
      },
      {
        path: "services-management",
        component: ServicesManagementComponent,
      },
      {
        path: "notifications",
        component: NotificationsComponent,
      },
      {
        path: "notifications-settings",
        component: NotificationsSettingsComponent,
      },
      {
        path: "calendar",
        component: CalendarComponent,
      },
      {
        path: "doctor-visit-tour/:id",
        component: DoctorVisitTourComponent,
      },
      {
        path: "calculation",
        component: CalculationComponent,
      },
      {
        path: "tags",
        component: TagsComponent,
      },
      {
        path: "cities",
        component: CitiesComponent,
      },
      {
        path: "municipalities",
        component: MunicipalitiesComponent,
      },
      {
        path: "employees",
        component: EmployeesComponent,
      },
      {
        path: "new-employee",
        component: NewEmployeeComponent,
      },
      {
        path: "employee/:id",
        component: EmployeeComponent,
      },
      {
        path: "categories",
        component: CategoriesComponent,
      },
      {
        path: "doctor-visits",
        component: DoctorVisitsComponent,
      },
      {
        path: "furniture-statuses",
        component: FurnitureStatusesComponent,
      },
      {
        path: "furniture",
        component: FurnitureComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
