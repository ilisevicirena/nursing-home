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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
