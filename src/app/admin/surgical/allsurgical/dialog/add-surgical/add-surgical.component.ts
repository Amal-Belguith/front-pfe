import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  SurgicalService } from '../../surgical.service';
import { Surgical } from '../../surgical.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-surgical',
  templateUrl: './add-surgical.component.html',
  styleUrls: ['./add-surgical.component.scss'],
})
export class AddSurgicalComponent {
  surgicalForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private surService: SurgicalService,
    public dialogRef: MatDialogRef<AddSurgicalComponent>,
    private snackBar: MatSnackBar
  ) {
    this.surgicalForm = this.formBuilder.group({
      cptCode: ['', Validators.required],
      cptDesc: ['', Validators.required],
      cptCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.surgicalForm.valid) {
      // Collect form data
      const formData = this.surgicalForm.value;
      const surgicalData: Surgical = {
        cptky: null,
        cptCode:  formData.cptCode,
        cptDesc: formData.cptDesc,
        cptCategory: formData.cptCategory
        
      };
      console.log('Surgical Data:', surgicalData);

      this.surService.checkIfSurgicalExists(surgicalData.cptCode).subscribe
      ((exists:boolean) => {
        if(exists){
          this.showNotification(
            'snackbar-warning',
            'Surgical already exist',
            'top',
            'center'
          );
        }else{
          
      this.surService.addSurgical(surgicalData).subscribe(
        (response) => {
          console.log('Surgical added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Surgical added successfully',
          'top',
          'center'
        );
        },
        (error) => {
          console.error('Error adding surgical:', error);
        }
          );
        }
      }
    );
    }
    else {
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

  onCancel(): void {
    this.dialogRef.close();
  }
}


