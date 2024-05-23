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
    @Inject(MAT_DIALOG_DATA) public data: {medication:MedicationResponse},
    private medicationService: MedicationService,
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.medicationForm=this.fb.group({
      medicationCode: [data.medication.medicationCode || '', Validators.required],
      medicationName: [data.medication.medicationName || '', Validators.required],
      medicationType: [data.medication.medicationType || '', Validators.required],
      medicationStrength: [data.medication.medicationStrength || '', Validators.required],
      medicationDosageForm: [data.medication.medicationDosageForm || '', Validators.required],
      ingredients: [data.medication.ingredients],
    });
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
    return option1 && option2 && option1.ingredientName === option2.ingredientName;
  }


  getStrengthOptions(medicationType: string): string[] {
    return this.medicationTypes[medicationType];
  }

  public fetchIngredients() {
    this.ingredientService.getAllIngredients().subscribe((res) => {
      console.log(res);
      this.ingredients = res;
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
  ingredientLinks:any = []
  onSubmit() {
    if (this.medicationForm.valid){
      const updatedMedication = this.medicationForm.value;

      updatedMedication.ingredients.map((ing: any) => {
        this.ingredients.map((item: any) => {
          if ((item.ingredientName == ing.ingredientName) && (item.ingredientDesc == ing.ingredientDesc)) {
            this.ingredientLinks.push({ ing: { ingredientKy: item.ingredientKy } });
          }
        });
      });

      const medicationCode = this.medicationForm.get('medicationCode');
      const medicationName = this.medicationForm.get('medicationName');
      const medicationType = this.medicationForm.get('medicationType');
      const medicationStrength = this.medicationForm.get('medicationStrength');
      const medicationDosageForm = this.medicationForm.get('medicationDosageForm');
      const ingredients = this.medicationForm.get('ingredients');
      
    if(medicationCode && medicationName && medicationType && medicationStrength && medicationDosageForm && ingredients &&
      medicationCode.value && medicationName.value && medicationType.value && medicationStrength.value && medicationDosageForm.value && ingredients.value
    ){
      const updatedMedication:MedicationResponse={

        medicationCode: medicationCode.value,
        medicationName: medicationName.value,
        medicationType: medicationType.value,
        medicationStrength:medicationStrength.value,
        medicationDosageForm: medicationDosageForm.value,
        ingredients: ingredients.value,
        medicationKy:undefined

      };
    
  
  
    this.medicationService.updateMedication(this.data.medication.medicationKy, updatedMedication)
      .subscribe(
        () => {
          this.showNotification(
            'snackbar-success',
            ' Update medication Successfully...!!!',
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
}else{
  this.showNotification('snackbar-warning','Please fill all required fiels','bottom','right')
}
  
}
}