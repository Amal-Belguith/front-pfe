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
      password: [{ value: '', disabled: true }, Validators.required],
      role: [data.staff.role, Validators.required],
      department: [data.staff.department],
      uploadedFile: [''],
    });
  }

  ngOnInit(): void {
    this.personalservice.getStaffById(this.data.staff.user_ky) 
    .subscribe(staff => {
      this.staff = staff;
      this.selectedFile = staff.uploadedFile ? new File([], staff.uploadedFile, { type: 'application/pdf' }) : undefined;
      this.staffForm.patchValue({
        firstname: staff.firstname,
        lastname: staff.lastname,
        email: staff.email,
        password: staff.password,  // Patch the password value
        role: staff.role,
        department: staff.department,
        uploadedFile: this.selectedFile ? this.selectedFile.name : ''
      });
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
      const firstname = this.staffForm.get('firstname');
      const lastname = this.staffForm.get('lastname');
      const email = this.staffForm.get('email');
      const role = this.staffForm.get('role'); // Correction de la récupération de l'élément ingredientDesc
      const department = this.staffForm.get('department');
      const uploadedFile = this.staffForm.get('uploadedFile');
  
      // Vérifiez si ingredientName et ingredientDesc sont définis avant d'accéder à leur propriété value pour éviter d'accéder à des propriétés de null
      if (firstname && lastname && email  && role && department && uploadedFile && firstname.value && lastname.value && email.value  && role.value && department.value && uploadedFile.value) { // Ajout de la vérification de ingredientName.value et ingredientDesc.value
        const updatedPersonal: Personal = {
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: this.staff.password,
          role: role.value,
          department: department.value,
          uploadedFile: uploadedFile.value,
          user_ky: undefined
        };
              this.personalservice.updatePersonal( this.data.staff.user_ky,updatedPersonal)
                .subscribe(
                  () => {
                    this.showNotification(
                      'snackbar-success',
                      ' Update ingredient Successfully...!!!',
                      'bottom',
                      'center'
                    );
                    this.dialogRef.close();
                  },
                  (error) => {
                    console.error('Error updating :', error);
                  }
                );
            }
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  } 
}