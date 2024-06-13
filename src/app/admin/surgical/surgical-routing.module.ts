import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllSurgicalComponent } from "./allsurgical/allsurgical.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { ViewDetailsSurgicalComponent } from "./view-details-surgical/view-details-surgical.component";
const routes: Routes = [
  {
    path: "all-surgical",
    component: AllSurgicalComponent,
  },
 
  {
    path: 'view/details/surgical/:id',
    component: ViewDetailsSurgicalComponent,
  },     
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurgicalRoutingModule {}
