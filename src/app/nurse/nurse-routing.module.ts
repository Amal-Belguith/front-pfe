import { Page404Component } from '../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CarePlansComponent } from './careplans/careplans.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'careplans',
    component: CarePlansComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'monitoring/:user_ky',
    component: MonitoringComponent,
  },
  {
    path: 'monitoring',
    component: MonitoringComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },

  { path: '**', component: Page404Component },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseRoutingModule {}
