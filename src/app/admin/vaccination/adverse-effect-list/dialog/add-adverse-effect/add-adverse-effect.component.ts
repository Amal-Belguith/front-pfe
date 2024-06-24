import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AdverseEffect, Vaccination } from 'app/admin/vaccination/model/vaccination';
import { AdverseEffectService } from 'app/admin/vaccination/services/adverse-effect.service';

@Component({
  selector: 'app-add-adverse-effect',
  templateUrl: './add-adverse-effect.component.html',
  styleUrls: ['./add-adverse-effect.component.scss']
})
export class AddAdverseEffectComponent {
  
  vaccinationForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAdverseEffectComponent>,
    private vaccinationService: AdverseEffectService,
    private snackBar: MatSnackBar
  ) {
    this.vaccinationForm = this.formBuilder.group({
      adverseEffectName: ['', Validators.required],
      adverseEffectSeverity: ['', Validators.required],
      adverseEffectDesc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.vaccinationForm.valid) {
      // Collect form data
      const formData = this.vaccinationForm.value;  
      // Construct Vaccination object
      const vaccinationData: AdverseEffect = {
        idAdverseEffect: null,
        adverseEffectName: formData.adverseEffectName,
        adverseEffectSeverity: formData.adverseEffectSeverity,
        adverseEffectDesc: formData.adverseEffectDesc,
      };
      this.vaccinationService.checkIfadveffExists(vaccinationData.adverseEffectName).subscribe
      ((exists:boolean) => {
        if(exists){
          this.showNotification(
            'snackbar-warning',
            'Adverse Effect already exist',
            'top',
            'center'
          );
        }else{
          
      this.vaccinationService.createSideEffects(vaccinationData).subscribe(
        (response) => {
          console.log('Adverse Effect added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Adverse Effect added successfully',
          'top',
          'center'
        );
        },
        (error) => {
          console.error('Error adding Adverse Effect:', error);
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
  onCancel(): void {
    this.dialogRef.close();
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
}
