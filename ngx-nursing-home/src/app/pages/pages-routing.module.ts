import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { PersonsComponent } from './persons/persons.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { AccomodationManagementComponent } from './accomodation-management/accomodation-management.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { PackagesComponent } from './packages/packages.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { ServicesManagementComponent } from './services-management/services-management.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsSettingsComponent } from './notifications/notifications-settings/notifications-settings.component';
import { CalendarComponent } from './calendar/calendar.component';

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
      path: 'room-management',
      component: RoomManagementComponent
    },
    {
      path: 'persons',
      component: PersonsComponent
    },
    {
      path: 'new-person',
      component: NewPersonComponent
    },
    {
      path: 'accomodation-management',
      component: AccomodationManagementComponent
    },
    {
      path: 'advanced-search',
      component: AdvancedSearchComponent
    },
    {
      path: 'profile/:id',
      component: ProfileComponent
    },
    {
      path: 'services',
      component: ServicesComponent
    },
    {
      path: 'packages',
      component: PackagesComponent
    },
    {
      path: 'discounts',
      component: DiscountsComponent
    },
    {
      path: 'services-management',
      component: ServicesManagementComponent
    },
    {
      path: 'notifications',
      component: NotificationsComponent
    },
    {
      path: 'notifications-settings',
      component: NotificationsSettingsComponent
    },
    {
      path: 'calendar',
      component: CalendarComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
