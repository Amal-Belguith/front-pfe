import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { personalsRoutingModule } from './personals-routing.module';
import { DeleteDialogComponent } from './allpersonals/dialogs/delete/delete.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AllpersonalsComponent } from './allpersonals/allpersonals.component';
import { PersonalService } from './allpersonals/personals.service';
import { AddPersonalComponent } from './add-personal/add-personal.component';

@NgModule({
  declarations: [
    AllpersonalsComponent,
    DeleteDialogComponent,
    AddPersonalComponent

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
