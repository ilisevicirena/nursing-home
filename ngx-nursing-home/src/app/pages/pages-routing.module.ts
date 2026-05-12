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
            UserRole.USER,
          ],
        },
      },
      {
        path: "new-person",
        component: NewPersonComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "accomodation-management",
        component: AccomodationManagementComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "advanced-search/:search",
        component: AdvancedSearchComponent,
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
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "packages",
        component: PackagesComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "discounts",
        component: DiscountsComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "services-management",
        component: ServicesManagementComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
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
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE],
        },
      },
      {
        path: "calculation",
        component: CalculationComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "tags",
        component: TagsComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "cities",
        component: CitiesComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "municipalities",
        component: MunicipalitiesComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "employees",
        component: EmployeesComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "new-employee",
        component: NewEmployeeComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "employee/:id",
        component: EmployeeComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "categories",
        component: CategoriesComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "doctor-visits",
        component: DoctorVisitsComponent,
        data: {
          Roles: [UserRole.ADMIN, UserRole.NURSE],
        },
      },
      {
        path: "furniture-statuses",
        component: FurnitureStatusesComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "furniture",
        component: FurnitureComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "users",
        component: UsersComponent,
        data: {
          Roles: [UserRole.ADMIN],
        },
      },
      {
        path: "my-profile",
        component: MyProfileComponent,
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
