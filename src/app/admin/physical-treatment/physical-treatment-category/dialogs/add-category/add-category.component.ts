import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhysicalTreatmentCategory } from 'app/admin/physical-treatment/model/physical-treatment.category';
import { PhyTrCategoryService } from 'app/admin/physical-treatment/services/physical-treatment-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  treatmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private phyTrCategoryService: PhyTrCategoryService,
    public dialogRef: MatDialogRef<AddCategoryComponent>
  ) {
    this.treatmentForm = this.formBuilder.group({
      phyCategoryName: ['', Validators.required],
      phyCategoryDesc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.treatmentForm.valid) {
      const categoryData: PhysicalTreatmentCategory = this.treatmentForm.value;
      this.phyTrCategoryService.checkIfTrCatExists(categoryData.phyCategoryName).subscribe
      ((exists:boolean) => {
        if(exists){
          this.showNotification(
            'snackbar-warning',
            'Physical Treatment Category already exist',
            'top',
            'center'
          );
        }else{
          
      this.phyTrCategoryService.addPhyTrCategory(categoryData).subscribe(
        (response) => {
          console.log('Physical Treatment Category added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Physical Treatment Category added successfully',
          'top',
          'center'
        );
        },
        (error) => {
          console.error('Error adding Physical Treatment Category:', error);
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
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}