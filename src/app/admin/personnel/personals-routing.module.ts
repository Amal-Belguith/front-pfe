import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AllpersonalsComponent } from "./allpersonals/allpersonals.component";
import { ViewDetailsStaffComponent } from "./view-details-staff/view-details-staff.component";

const routes: Routes = [
  {
    path: "allpersonals",
    component: AllpersonalsComponent,
  },
  {
    path: 'view/details/staff/:id',
    component: ViewDetailsStaffComponent,
  }, 
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class personalsRoutingModule {}
