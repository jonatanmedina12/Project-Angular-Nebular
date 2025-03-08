import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../shared/layouts/dashboard-layout/dashboard-layout.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const ROUTES_DASHBOARD: Routes = [ 
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
