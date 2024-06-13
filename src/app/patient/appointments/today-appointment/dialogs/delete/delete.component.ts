import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'app/patient/appointments/appointmentModel';

@Component({
  selector: 'app-delete:not(q)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteAppComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAppComponent>,
    @Inject(MAT_DIALOG_DATA) public app: Appointment
    
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
  
}

