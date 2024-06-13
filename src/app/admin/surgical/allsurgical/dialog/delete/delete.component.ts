import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { Surgical } from '../../surgical.model';



@Component({
  selector: 'app-delete:not(n)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteSurgicalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSurgicalComponent>,
    @Inject(MAT_DIALOG_DATA) public surgical: Surgical
    
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
  
}
