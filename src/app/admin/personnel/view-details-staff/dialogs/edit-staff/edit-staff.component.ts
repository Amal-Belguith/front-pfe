import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'app/admin/medication/MedicationResponse';
import { IngredientService } from 'app/admin/ingredient/allingredient/ingredient.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Personal } from 'app/admin/personnel/personal.model';
import { PersonalService } from 'app/admin/personnel/allpersonals/personals.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  selectedFile: File | undefined;
  staffForm: FormGroup;
  staff!: Personal;
  user_ky: any;

  constructor(
    private dialogRef: MatDialogRef<EditStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { staff: Personal },
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private personalservice: PersonalService,
  ) {
    this.staffForm = this.formBuilder.group({
      firstname: [data.staff.firstname, Validators.required],
      lastname: [data.staff.lastname, Validators.required],
      email: [
        data.staff.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [''],
      role: [data.staff.role, Validators.required],
      department: [data.staff.department],
      uploadedFile: [''],
    });
  }

  ngOnInit(): void {
    this.personalservice.getStaffById(this.data.staff.user_ky) 
    .subscribe(staff => {
      console.log('User details:', staff); 
      this.user_ky = staff.user_ky; 
      this.staff = staff;
      this.selectedFile = staff.uploadedFile ? new File([], staff.uploadedFile, { type: 'application/pdf' }) : undefined;
      this.staffForm.patchValue({
        firstname: staff.firstname,
        lastname: staff.lastname,
        email: staff.email,
        password: '' ,// Keep password field empty
        role: staff.role,
        department: staff.department,
        uploadedFile: this.selectedFile ? this.selectedFile.name : ''
      });
    }, (error) => {
      console.error('Error loading Personal details:', error); 
    });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.staffForm.valid) {
      const formData = this.staffForm.value;
      const updatedPersonal: any = {
        user_ky: this.user_ky,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        uploadedFile: formData.uploadedFile
      };
  
      // Include password only if it is provided
      if (formData.password) {
        updatedPersonal.password = formData.password;
      }
  
      // Check for null before calling updateUser
      if (this.user_ky !== null) {
        this.personalservice.updatePersonal(this.user_ky, updatedPersonal).subscribe({
          next: () => {
            this.showNotification('snackbar-success', 'Data Updated successfully', 'bottom', 'center');
            this.dialogRef.close(); // Close the dialog on success
          },
          error: (error) => {
            this.showNotification('snackbar-error', 'Error Updating Data', 'bottom', 'center');
          }
        });
      } else {
        this.showNotification('snackbar-error', 'Error Updating Data', 'bottom', 'center');
      }
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }  

}