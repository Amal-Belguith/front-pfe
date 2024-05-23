import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllMedicationComponent } from "./allstaff/allmedication.component";
import { AddMedicationComponent } from "./allstaff/dialog/add-medication/add-medication.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { ViewDetailsMedicationComponent } from "./view-details-medication/view-details-medication.component";
const routes: Routes = [
  {
    path: "all-medication",
    component: AllMedicationComponent,
  },
  
  {
    path: "upload-medication",
    component: UploadFileComponent,
  },
  {
    path: 'view/details/medication/:id',
    component: ViewDetailsMedicationComponent,
  }, 
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationRoutingModule {}
