import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPersonalComponent } from "./add-personal/add-personal.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AllpersonalsComponent } from "./allpersonals/allpersonals.component";

const routes: Routes = [
  {
    path: "allpersonals",
    component: AllpersonalsComponent,
  },
  {
    path: "add-personal",
    component: AddPersonalComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class personalsRoutingModule {}
