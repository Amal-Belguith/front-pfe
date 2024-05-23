import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { IngredientService } from '../../ingredient.service';
import { Ingredient } from '../../ingredient.model';



@Component({
  selector: 'app-delete:not(n)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteIngredientComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public ingredient: Ingredient
    
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
  
}
