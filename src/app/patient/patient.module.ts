import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { HistoryComponent } from './CareFile/History/History.component';
import { AppointmentModule } from 'app/admin/appointment/appointment.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    PrescriptionsComponent,
    MedicalRecordsComponent,
    BillingComponent,
    SettingsComponent,

  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PatientRoutingModule,
    NgApexchartsModule,
    NgScrollbarModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PatientModule {}
