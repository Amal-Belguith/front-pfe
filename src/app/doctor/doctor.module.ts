import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormComponent } from './appointments/form/form.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsService } from './appointments/appointments.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { CarePlanComponent } from './careplan/careplan.component';
import { MedicalRecordComponent } from './medical-record/medical-records.component';
import { ConsultationComponent } from './consultation/medical-records.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    FormComponent,
    DoctorsComponent,
    PatientsComponent,
    SettingsComponent,
    CarePlanComponent,
    MedicalRecordComponent,
    ConsultationComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatIconModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

  ],
  providers: [AppointmentsService],
})
export class DoctorModule {}
