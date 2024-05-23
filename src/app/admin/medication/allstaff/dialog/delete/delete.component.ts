import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MedicationService } from '../../medication.service';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { Ingredient } from 'app/admin/ingredient/allingredient/ingredient.model';


@Component({
  selector: 'app-delete:not(n)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteMedicationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteMedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public medication: MedicationResponse
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
  getIngredientNames(ingredients: Ingredient[]): string {
    return ingredients ? ingredients.map(ingredient => ingredient.ingredientName).join(', ') : '';
  }
  
}
