import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { personalsRoutingModule } from './personals-routing.module';
import { DeleteStaffComponent } from './allpersonals/dialogs/delete/delete.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AllpersonalsComponent } from './allpersonals/allpersonals.component';
import { PersonalService } from './allpersonals/personals.service';
import { AddPersonalComponent } from './allpersonals/dialogs/add-personal/add-personal.component';
import { ViewDetailsStaffComponent } from './view-details-staff/view-details-staff.component';
import { EditStaffComponent } from './view-details-staff/dialogs/edit-staff/edit-staff.component';

@NgModule({
  declarations: [
    AllpersonalsComponent,
    DeleteStaffComponent,
    AddPersonalComponent,
    ViewDetailsStaffComponent,
    EditStaffComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    personalsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [PersonalService],
})
export class personalsModule {}
