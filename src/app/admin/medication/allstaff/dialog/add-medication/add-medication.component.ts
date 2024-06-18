import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MedicationResponse } from '../../../MedicationResponse';
import { MedicationService } from '../../medication.service';
import { IngredientService } from '../../../../ingredient/allingredient/ingredient.service';
import { Ingredient } from '../../../../ingredient/allingredient/ingredient.model';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss'],
})
export class AddMedicationComponent implements OnInit {
  subscription!: Subscription;
  ingredients : Ingredient [] = [];  
  strengthOptions: string[] = [];
  medicationForm: FormGroup;
  medicationTypes: { [key: string]: string[] } = {
    OINTMENT: [
      'STRENGTH_1_PERCENT',
      'STRENGTH_2_PERCENT',
      'STRENGTH_5_PERCENT',
      'STRENGTH_10_PERCENT',
    ],
    SOFT_CAPSULE: [
      'STRENGTH_5MG_PER_ML',
      'STRENGTH_10MG_PER_ML',
      'STRENGTH_20MG_PER_ML',
      'STRENGTH_50MG_PER_ML',
      'STRENGTH_100MG_PER_ML',
    ],
    FILM_COATED_TABLET: [
      'STRENGTH_50MG',
      'STRENGTH_100MG',
      'STRENGTH_250MG',
      'STRENGTH_500MG',
      'STRENGTH_1000MG',
    ],
  };

  constructor(
    private fb: FormBuilder,private medicationService: MedicationService, private ingredientService : IngredientService, public dialogRef:MatDialogRef<AddMedicationComponent>, 
    private snackBar:MatSnackBar
  ) {
    this.medicationForm = this.fb.group({
      medicationCode: ['', [Validators.required]],
      medicationName: ['', [Validators.required]],
      medicationType: ['', [Validators.required]],
      medicationStrength: ['', [Validators.required]],
      medicationDosageForm: ['', [Validators.required]],
      ingredients: [''], 
    });
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  public fetchIngredients() {
    this.ingredientService.getAllIngredients().subscribe((res) => {
      console.log(res);
      this.ingredients = res; 
    });
  }


  onTypeChange(): void {
    const selectedType = this.medicationForm.get('medicationType')?.value;
    if (selectedType) {
      const availableStrengths = this.medicationTypes[selectedType];
      this.medicationForm.get('medicationStrength')?.setValue('');
      this.strengthOptions = availableStrengths;
    }
  }

  onSubmit(): void {
    if (this.medicationForm.valid) {
      const formData = this.medicationForm.value;
      // Check if formData.ingredients is an array before calling map
    const ingredientsArray = Array.isArray(formData.ingredients) ? formData.ingredients : [];

    const newMedication: MedicationResponse = {
      medicationKy: null,
      medicationCode: formData.medicationCode,
      medicationName: formData.medicationName,
      medicationType: formData.medicationType,
      medicationStrength: formData.medicationStrength,
      medicationDosageForm: formData.medicationDosageForm,
      ingredients: ingredientsArray,
      medicIngredientLinks: ingredientsArray.map((ingredient: Ingredient) => {
        return { ing: { ingredientKy: ingredient.ingredientKy } };
      })
    };
  
      console.log('Medication Data:', newMedication);
  
      this.medicationService.checkIfMedicationExists(newMedication.medicationName, newMedication.medicationCode).subscribe(
        (exists: boolean) => {
          if (exists) {
            this.showNotification(
              'snackbar-error',
              'Medication already exist',
              'top',
              'center'
            );
          } else {
            this.medicationService.addMedication(newMedication).subscribe(
              (response) => {
                console.log('Medication added successfully:', response);
                this.dialogRef.close();
                // Optionally, display a success message or redirect the user
                this.showNotification(
                  'snackbar-success',
                  'Medication added successfully...!!!',
                  'top',
                  'center'
                );
              },
              (error) => {
                console.error('Error adding medication:', error);
              }
            );
          }
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'top', 'center');
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
