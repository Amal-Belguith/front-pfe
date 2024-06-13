import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BioAnalysis } from 'app/admin/bioanalysis/model/bioanalysis';
import { BioanalysisService } from 'app/admin/bioanalysis/service/bioanalysis.service';

@Component({
  selector: 'app-addbioanalysis',
  templateUrl: './addbioanalysis.component.html',
  styleUrls: ['./addbioanalysis.component.scss']
})
export class AddbioanalysisComponent {
  bioanalysisForm: FormGroup ;
  bioAnalyiss: BioAnalysis[] = []; // Populate this with Medication objects
  


  
  constructor(
    private formBuilder: FormBuilder,
    private bioanalysisService: BioanalysisService,
    public dialogRef: MatDialogRef<AddbioanalysisComponent>,
    private snackBar: MatSnackBar,
  ) {
    this.bioanalysisForm = this.formBuilder.group({
      analysisName: ['', Validators.required],
      analysisType: ['', Validators.required],
      analysisDesc: ['', Validators.required],
      analysisUnit: ['', Validators.required],
      analysisValueMin: ['', Validators.required],
      analysisValueMax: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.bioanalysisForm.valid) {
      // Extract form data
      const formData = this.bioanalysisForm.value;

       // Construct Vaccination object
       const bioanalysisData: BioAnalysis = {
        id: null,
        biologicalAnalysisName: formData.analysisName,
        biologicalAnalysisType: formData.analysisType,
        biologicalAnalysisDesc: formData.analysisDesc,
        biologicalAnalysisMeasurmentUnit: formData.analysisUnit,
        biologicalAnalysisRefValueMin: formData.analysisValueMin,
        biologicalAnalysisRefValueMax: formData.analysisValueMax
        
      };
      
      this.bioanalysisService.checkIfAnalyseExists(bioanalysisData.biologicalAnalysisName).subscribe
      ((exists:boolean) => {
        if(exists){
          this.showNotification(
            'snackbar-warning',
            ' Biological Analysis already exist',
            'top',
            'center'
          );
        }else{
          
      this.bioanalysisService.createBioAnalysis(bioanalysisData).subscribe(
        (response) => {
          console.log('Biological Analysis added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Biological Analysis added successfully...!!!',
          'bottom',
          'center'
        );
        },
        (error) => {
          console.error('Error adding Biological Analysis:', error);
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
