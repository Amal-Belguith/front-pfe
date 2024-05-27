import { Component,OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  constructor(private fb: UntypedFormBuilder, private appservice:AppointmentService) {
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

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.user_ky = currentUser.user_ky;
    
    this.appservice.getAllApp();
  }
  onSubmit() {
   
    const formData = this.bookingForm.value;
    const newApp: Appointment = {

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
      injury: formData.injury,
      user_ky: this.user_ky
    };
    
    this.appservice.addApp(newApp);
    console.log('Appointment added successfully', newApp)
    alert('Appointment added successfully');
    this.bookingForm.reset();

  }
    get f() {
    return this.bookingForm.controls;
    }
    Cancel() {
    this.bookingForm.reset(); 
    }

}
