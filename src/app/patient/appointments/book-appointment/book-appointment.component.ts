import { Component,OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'app/patient/appointments/appointmentModel';
import { AppointmentService } from 'app/patient/appointments/appointmentservice';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  
  minDate: Date;
  bookingForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  isDisabled = true;
  user_ky!: number;
  constructor(private fb: UntypedFormBuilder, private appservice:AppointmentService,private snackBar: MatSnackBar,private route: ActivatedRoute,) {
    this.bookingForm = this.fb.group({
      first: ['', [Validators.required]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      doa: ['', [Validators.required]],
      timeslot: ['', [Validators.required]],
      injury: [''],
    });

    this.minDate = new Date(); // Définir la date minimale comme la date actuelle
  
  }

  ngOnInit(): void {

 
    this.appservice.getAllApp();
  }
  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.value;
      const newApp: Appointment = {
        app_ky: null,
        first: formData.first,
        last: formData.last,
        gender: formData.gender,
        mobile: formData.mobile,
        address: formData.address,
        email: formData.email,
        dob: formData.dob,
        doctor: formData.doctor,
        doa: formData.doa,
        timeslot: formData.timeslot,
        injury: formData.injury
      };
  
      this.appservice.addApp(newApp).subscribe(
        response => {
          this.showNotification('snackbar-success', 'Appointment added successfully, please check your email!', 'top', 'center');
          this.bookingForm.reset();
        },
        error => {
          if (error.status === 409) {
            this.showNotification('snackbar-error', 'Please choose another date or time', 'top', 'center');
          } else {
            this.showNotification('snackbar-error', 'Error adding appointment ', 'top', 'center');
          }
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'top', 'center');
    }
  }
  
  
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  
  
  get f() {
   return this.bookingForm.controls;
  }
  Cancel() {
    this.bookingForm.reset(); 
  }

}
