import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import {HistoryComponent } from "./History/History.component";

const routes: Routes = [
  {
    path: "History",
    component: HistoryComponent,
  },


  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
