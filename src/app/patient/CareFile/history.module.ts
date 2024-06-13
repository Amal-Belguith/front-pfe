import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppointmentsRoutingModule } from './history-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { HistoryComponent } from './History/History.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
 
       HistoryComponent,

  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [],
})
export class HistoryModule {}
