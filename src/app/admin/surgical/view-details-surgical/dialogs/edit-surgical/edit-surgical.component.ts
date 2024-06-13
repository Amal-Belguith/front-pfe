import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'app/admin/medication/MedicationResponse';
import { IngredientService } from 'app/admin/ingredient/allingredient/ingredient.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Surgical } from 'app/admin/surgical/allsurgical/surgical.model';
import { SurgicalService } from 'app/admin/surgical/allsurgical/surgical.service';

@Component({
  selector: 'app-edit-surgical',
  templateUrl: './edit-surgical.component.html',
  styleUrls: ['./edit-surgical.component.scss']
})
export class EditSurgicalComponent implements OnInit {
  surgicalForm: FormGroup;
  surgical!: Surgical;
  ingredientKy: any;
  
  constructor(
    private dialogRef: MatDialogRef<EditSurgicalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { surgical: Surgical }, // Inject data
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private surservice: SurgicalService,
  
  ) {
    // Initialize form with data passed from parent component
    this.surgicalForm = this.formBuilder.group({
      cptCode: [data.surgical.cptCode, Validators.required],
      cptDesc: [data.surgical.cptDesc, Validators.required],
      cptCategory: [data.surgical.cptCategory, Validators.required]
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
      if (this.surgicalForm.valid) {
        const cptCode = this.surgicalForm.get('cptCode');
        const cptDesc = this.surgicalForm.get('cptDesc'); 
        const cptCategory = this.surgicalForm.get('cptCategory');

        
        if (cptCode && cptDesc && cptCategory && cptCode.value && cptDesc.value && cptCategory.value) { 
          const updatedSurgical: Surgical = {
            cptCode: cptCode.value,
            cptDesc: cptDesc.value,
            cptCategory: cptCategory.value,
            cptky: undefined
          };
          this.surservice.checkIfSurgicalExists(updatedSurgical.cptCode).subscribe
          ((exists:boolean) => {
            if(exists){
              this.showNotification(
                'snackbar-warning',
                ' Surgical already exist',
                'top',
                'center'
              );
            }else{
          
                this.surservice.updateSurgical( this.data.surgical.cptky,updatedSurgical)
                  .subscribe(
                    () => {
                      this.showNotification(
                        'snackbar-success',
                        ' Update surgical Successfully...!!!',
                        'bottom',
                        'center'
                      );
                      this.dialogRef.close();
                    },
                    (error) => {
                      console.error('Error updating surgical:', error);
                    }
                      );
                    }
                  }
                );
                }
                else {
                  this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
                }
                
              }
            }
          }