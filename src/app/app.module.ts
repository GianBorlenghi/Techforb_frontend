import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/Login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Component/Dashboard/dashboard.component';
import { SensorComponent } from './Component/sensor/sensor.component';
import { FormatDatePipe } from './Component/sensor/format-date.pipe';
import { PlantComponent } from './Component/plant/plant.component';
import { AlertComponent } from './Component/alert/alert.component';
import { RegisterComponent } from './Component/register/register.component';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './Component/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SensorComponent,
    FormatDatePipe,
    PlantComponent,
    AlertComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
