import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PersonalService } from '../../personals.service';
import { Personal } from 'app/admin/personnel/personal.model';


@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteStaffComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public staff: Personal
    
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
 
}
