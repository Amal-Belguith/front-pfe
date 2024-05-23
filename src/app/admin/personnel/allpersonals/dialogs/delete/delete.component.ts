import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PersonalService } from '../../personals.service';

export interface DialogData {
  id: number;
  name: string;
  department: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public personalsService: PersonalService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
 
}