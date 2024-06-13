import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Appointments } from '../appointments.model';
import { formatDate } from '@angular/common';
import { Appointment } from 'app/patient/appointments/appointmentModel';

export interface DialogData {
  id: number;
  action: string;
  appointments: Appointments;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public app: Appointment
    
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
}