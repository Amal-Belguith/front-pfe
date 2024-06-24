import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'app/admin/medication/MedicationResponse';
import { IngredientService } from 'app/admin/ingredient/allingredient/ingredient.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent implements OnInit {
  ingredientForm: FormGroup;
  ingredient!: Ingredient;
  ingredientKy: any;
  
  constructor(
    private dialogRef: MatDialogRef<EditIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredient: Ingredient }, // Inject data
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private ingredientservice: IngredientService,
  
  ) {
    // Initialize form with data passed from parent component
    this.ingredientForm = this.formBuilder.group({
      ingredientName: [data.ingredient.ingredientName, Validators.required],
      ingredientDesc: [data.ingredient.ingredientDesc, Validators.required],
    });
  }

  ngOnInit(): void {
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
      if (this.ingredientForm.valid) {
        const ingredientName = this.ingredientForm.get('ingredientName');
        const ingredientDesc = this.ingredientForm.get('ingredientDesc');
    
        // Vérifiez si ingredientName et ingredientDesc sont définis avant d'accéder à leur propriété value pour éviter d'accéder à des propriétés de null
        if (ingredientName && ingredientDesc && ingredientName.value && ingredientDesc.value) {
          const updatedIngredient: Ingredient = {
            ingredientName: ingredientName.value,
            ingredientDesc: ingredientDesc.value,
            ingredientKy: undefined
          };
    
          this.ingredientservice.updateIngredient(this.data.ingredient.ingredientKy, updatedIngredient).subscribe(
            () => {
              this.showNotification(
                'snackbar-success',
                'Update ingredient Successfully...!!!',
                'bottom',
                'center'
              );
              this.dialogRef.close();
            },
            (error) => {
              console.error('Error updating ingredient:', error);
              this.showNotification(
                'snackbar-error',
                'Error updating ingredient. Please try again later.',
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
          }
