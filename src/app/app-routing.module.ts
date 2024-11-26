import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/Login/login.component';
import { LoginGuard } from './Guard/LoginGuard';
import { DashboardComponent } from './Component/Dashboard/dashboard.component';
import { DashboardGuard } from './Guard/DashboardGuard';
import { SensorComponent } from './Component/sensor/sensor.component';
import { PlantComponent } from './Component/plant/plant.component';
import { AlertComponent } from './Component/alert/alert.component';
import { RegisterComponent } from './Component/register/register.component';
import { ProfileComponent } from './Component/profile/profile.component';

const routes: Routes = [
  { path:'login',component: LoginComponent,canActivate:[DashboardGuard],pathMatch: 'full'},
  { path:'',component: DashboardComponent,canActivate:[DashboardGuard],pathMatch: 'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[LoginGuard],pathMatch:'full'},
  {path:'dashboard/sensor',component:SensorComponent,canActivate:[LoginGuard],pathMatch:'full'},
  {path:'dashboard/plantas',component:PlantComponent,canActivate:[LoginGuard],pathMatch:'full'},
  {path:'dashboard/alertas',component:AlertComponent,canActivate:[LoginGuard],pathMatch:'full'},
  {path:'register',component:RegisterComponent,pathMatch:'full'},
  {path:'profile',component:ProfileComponent,canActivate:[LoginGuard],pathMatch:'full'},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
