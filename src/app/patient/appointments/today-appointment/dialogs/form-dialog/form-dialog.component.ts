import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'app/patient/appointments/appointmentModel';
import { AppointmentService } from 'app/patient/appointments/appointmentservice';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class UpdateComponent implements OnInit {
  minDate: Date;
  bookingForm: UntypedFormGroup;
  app_ky!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private appService: AppointmentService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      first: ['', [Validators.required]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: [''],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      dob: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      doa: ['', [Validators.required]],
      timeslot: ['', [Validators.required]],
      injury: ['']
    });
    this.minDate = new Date(); // Set the minimum date to the current date
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const appointmentData = params as Appointment;
      this.app_ky = appointmentData.app_ky;
      this.bookingForm.patchValue(appointmentData);
    });
  }


  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.value;
      const updateAppointment: Appointment = {
        app_ky: this.app_ky,
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

      this.appService.updateApp(this.app_ky, updateAppointment).subscribe(
        response => {
          this.showNotification('snackbar-success', 'Appointment updated successfully!', 'bottom', 'center');
        },
        error => {
          if (error.status === 409) {
            this.showNotification('snackbar-warning', 'Please choose another date or time.', 'bottom', 'right');
          } else {
            this.showNotification('snackbar-error', 'Please choose another date or time.', 'bottom', 'right');
          }
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }

  showNotification(colorName: string, text: string, placementFrom: MatSnackBarVerticalPosition, placementAlign: MatSnackBarHorizontalPosition): void {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  cancel(): void {
    this.bookingForm.reset();
  }
}

