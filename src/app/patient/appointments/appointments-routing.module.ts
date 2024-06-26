import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { UpcomingAppointmentComponent } from "./upcoming-appointment/upcoming-appointment.component";
import { PastAppointmentComponent } from "./past-appointment/past-appointment.component";
import { TodayAppointmentComponent } from "./today-appointment/today-appointment.component";
import { BookAppointmentComponent } from "./book-appointment/book-appointment.component";
import { UpdateComponent } from "./today-appointment/dialogs/form-dialog/form-dialog.component";
import { DeleteAppComponent } from "./today-appointment/dialogs/delete/delete.component";

const routes: Routes = [
  {
    path: "Book Appointment",
    component: BookAppointmentComponent,
  },
  {
    path: "List Appointments",
    component: TodayAppointmentComponent,
  },
  {
    path: "upcoming",
    component: UpcomingAppointmentComponent,
  },
  {
    path: "past",
    component: PastAppointmentComponent,
  },
  {
    path: "update",
    component: UpdateComponent,
  },

  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
