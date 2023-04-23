import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { PersonsComponent } from './persons/persons.component';
import { NewPersonComponent } from './new-person/new-person.component';

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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
