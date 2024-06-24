import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicationService } from 'app/admin/medication/allstaff/medication.service';
import { IngredientService } from 'app/admin/ingredient/allingredient/ingredient.service';



@Component({
  selector: 'app-edit-medication',
  templateUrl: './edit-medication.component.html',
  styleUrls: ['./edit-medication.component.scss']
})
export class EditMedicationComponent implements OnInit {
  medicationForm!: FormGroup;
  ingredients: Ingredient[] = [];
  strengthOptions: string[] = [];
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
    public dialogRef: MatDialogRef<EditMedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medication: MedicationResponse },
    private medicationService: MedicationService,
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.medicationForm = this.fb.group({
      medicationCode: [data.medication.medicationCode || '', Validators.required],
      medicationName: [data.medication.medicationName || '', Validators.required],
      medicationType: [data.medication.medicationType || '', Validators.required],
      medicationStrength: [data.medication.medicationStrength || '', Validators.required],
      medicationDosageForm: [data.medication.medicationDosageForm || '', Validators.required],
      ingredients: [data.medication.ingredients],
      medicIngredientLinks: this.fb.array([])
    });

    // Update strength options based on the initial medication type
    if (typeof data.medication.medicationType === 'string') {
      this.strengthOptions = this.getStrengthOptions(data.medication.medicationType);
    } else {
      // Handle the case where medicationType is not a string (e.g., log an error or set a default value)
      console.error('Unexpected medicationType type:', data.medication.medicationType);
    }
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  onTypeChange(): void {
    const selectedType = this.medicationForm.get('medicationType')?.value;
    if (selectedType) {
      this.strengthOptions = this.getStrengthOptions(selectedType);
      this.medicationForm.get('medicationStrength')?.setValue('');
    }
  }

  getMedicationTypeKeys() {
    return Object.keys(this.medicationTypes);
  }

  compareWithIngredients(option1: any, option2: any): boolean {
    return option1 && option2 && option1.ingredientKy === option2.ingredientKy;
  }

  getStrengthOptions(medicationType: string): string[] {
    return this.medicationTypes[medicationType] || [];
  }

  public fetchIngredients() {
    this.ingredientService.getAllIngredients().subscribe((res) => {
      console.log(res);
      this.ingredients = res;
      this.medicationForm.patchValue({
        ingredients: this.data.medication.ingredients || []
      });
    });
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

  onSubmit() {
    if (this.medicationForm.valid) {
      const updatedMedication = this.medicationForm.value;
      updatedMedication.medicIngredientLinks = [];
  
      updatedMedication.ingredients.map((ing: any) => {
        this.ingredients.map((item: any) => {
          if (item.ingredientKy === ing.ingredientKy) {
            updatedMedication.medicIngredientLinks.push({ ing: { ingredientKy: item.ingredientKy } });
          }
        });
      });
  
      this.medicationService.updateMedication(this.data.medication.medicationKy, updatedMedication)
        .subscribe(
          () => {
            this.showNotification(
              'snackbar-success',
              'Update medication Successfully...!!!',
              'bottom',
              'center'
            );
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error updating medication:', error);
            this.showNotification(
              'snackbar-error',
              'Error updating medication. Please try again later.',
              'bottom',
              'right'
            );
          }
        );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }  
}