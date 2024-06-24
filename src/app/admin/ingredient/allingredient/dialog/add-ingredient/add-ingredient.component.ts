import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../ingredient.service';
import { Ingredient } from '../../ingredient.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss'],
})
export class AddIngredientComponent {
  ingredientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ingredientService: IngredientService,
    public dialogRef: MatDialogRef<AddIngredientComponent>,
    private snackBar: MatSnackBar
  ) {
    this.ingredientForm = this.formBuilder.group({
      ingredientName: ['', Validators.required],
      ingredientDesc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.ingredientForm.valid) {
      // Collect form data
      const formData = this.ingredientForm.value;
      
      // Map selected side effect names to AdverseEffect objects
     /* const selected: Symptoms[] = formData.symptoms.map((symptomName: string) => {
        return { symptomKy: null, symptomName: symptomName, symptomDesc: '' };
      });*/
  
      // Create an Allergy object from form values
      const ingredientData: Ingredient = {
        ingredientKy: null,
        ingredientName:  formData.ingredientName,
        ingredientDesc: formData.ingredientDesc
        
      };
      console.log('Ingredient Data:', ingredientData);

      this.ingredientService.checkIfIngredientExists(ingredientData.ingredientName).subscribe
      ((exists:boolean) => {
        if(exists){
          this.showNotification(
            'snackbar-warning',
            'Ingredient already exist',
            'top',
            'center'
          );
        }else{
          
      this.ingredientService.addIngredient(ingredientData).subscribe(
        (response) => {
          console.log('Ingredient added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Ingredient added successfully',
          'top',
          'center'
        );
        },
        (error) => {
          console.error('Error adding ingredient:', error);
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


