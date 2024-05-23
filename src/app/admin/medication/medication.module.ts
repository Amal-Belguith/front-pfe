import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicationRoutingModule } from './medication-routing.module';
import { AllMedicationComponent } from './allstaff/allmedication.component';
import { DeleteMedicationComponent } from './allstaff/dialog/delete/delete.component';
import { AddMedicationComponent } from './allstaff/dialog/add-medication/add-medication.component';
import { MedicationService } from './allstaff/medication.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { IngredientService } from '../ingredient/allingredient/ingredient.service';
import { ViewDetailsMedicationComponent } from './view-details-medication/view-details-medication.component';
import { EditMedicationComponent } from './view-details-medication/dialogs/edit-medication/edit-medication.component';
@NgModule({
  declarations: [
    AllMedicationComponent,
    DeleteMedicationComponent,
    AddMedicationComponent,
    UploadFileComponent,
    ViewDetailsMedicationComponent,
    EditMedicationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicationRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  providers: [MedicationService,IngredientService],
})
export class MedicationModule {}
