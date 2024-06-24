import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PersonalService } from '../../personals.service';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Personal } from '../../../personal.model';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss'],
})
export class AddPersonalComponent {
  selectedFile: File | undefined;
  returnUrl!: string;
  perForm: UntypedFormGroup;
  hide3 = true;
  hide = true;
  agree3 = false;
  constructor(private fb: UntypedFormBuilder, private personalservice: PersonalService,  public dialogRef: MatDialogRef<AddPersonalComponent>,
    private snackBar: MatSnackBar) {
    this.perForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      role: ['', Validators.required],
      department: [''],
      uploadFile: [''],
    });

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Récupération du fichier sélectionné
  }

  ngOnInit(): void {
  }

 

  onSubmit(): void {
    if (this.perForm.valid) {
      const formData = this.perForm.value;
      const newPersonal: Personal = {
        user_ky: null,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        uploadedFile: this.selectedFile ? this.selectedFile.name : ''
      };
      console.log('Staff Data:', newPersonal);
  
      this.personalservice.addPersonal(newPersonal).subscribe(
        (response) => {
          console.log('Staff added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
            'snackbar-success',
            'Staff added successfully',
            'top',
            'center'
          );
        },
        (error) => {
          console.error('Error adding staff:', error);
          this.showNotification(
            'snackbar-error',
            'Error adding staff',
            'top',
            'center'
          );
        }
      );
    }
  }
  
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ): void {
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

