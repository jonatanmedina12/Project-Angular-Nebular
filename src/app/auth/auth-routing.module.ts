import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/components/login/login.component';

export const  ROUTES_AUTH: Routes = [{

  path: '',
  component: AuthLayoutComponent,
  children: [
    { path: 'login', component: LoginComponent },
  
    { path: '', redirectTo: 'login', pathMatch: 'full' }]

    
}];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
