import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { CarePlanComponent } from './careplan/careplan.component';
import { ConsultationComponent } from './consultation/medical-records.component';
import { MedicalRecordComponent } from './medical-record/medical-records.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'Consultation',
    component: ConsultationComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'careplan',
    component: CarePlanComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: 'Consultation/:user_ky', 
  component: ConsultationComponent 
},

{ path: 'CarePlan/:user_ky', 
  component: CarePlanComponent 
},

{
  path: 'medicalrecord/:user_ky',
  component: MedicalRecordComponent,
},
  
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
