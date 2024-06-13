import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdverseEffect, ICD10, Medication, Vaccination } from 'app/admin/vaccination/model/vaccination';
import { AdverseEffectService } from 'app/admin/vaccination/services/adverse-effect.service';
import { VaccinationService } from 'app/admin/vaccination/services/vaccination.service';

@Component({
  selector: 'app-update-vaccination',
  templateUrl: './update-vaccination.component.html',
  styleUrls: ['./update-vaccination.component.scss']
})
export class UpdateVaccinationComponent implements OnInit {

  vaccinationForm: FormGroup;
  vaccination!: Vaccination;
  vaccinationId: any;
  sideEffects: AdverseEffect[] = [];
  sideEffectsNames: string[] = [];
  selectedsideEffects: AdverseEffect[] = []; // Ajoutez une propriété pour stocker les symptômes sélectionnés
  selectedsideEffectsNames: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateVaccinationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vaccination: Vaccination }, // Inject data
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private vaccinationService: VaccinationService,
    private adverseEffectService: AdverseEffectService,

  ) {
    // Initialize form with data passed from parent component
    this.vaccinationForm = this.formBuilder.group({
      vaccinationName: [data.vaccination.vaccineLabel, Validators.required],
      vaccinationType: [data.vaccination.vaccineType, Validators.required],
      Manufacturer: [data.vaccination.vaccineManufacturer, Validators.required],
      sideEffects: [data.vaccination.sideEffects, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSymptomNames();
  }
 


  loadSymptomNames(): void {
    this.adverseEffectService.getSideEffects().subscribe(
      (adverseEffects: AdverseEffect[]) => {
        this.sideEffects = adverseEffects;
        this.sideEffectsNames = adverseEffects.map(effect => effect.adverseEffectName);
      },
      (error) => {
        console.error('Error fetching adverse effects:', error);
      }
    );
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

  /*onSubmit() {
    if (this.vaccinationForm.valid) {
      const updatedVaccination: Vaccination = this.vaccinationForm.value;
      this.vaccinationService.updateVaccination(updatedVaccination, this.data.vaccination.idVaccination)
        .subscribe(
          () => {
            this.showNotification('success', 'Vaccination updated successfully', 'bottom', 'right');
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error updating vaccination:', error);
            this.showNotification('error', 'Failed to update vaccination', 'bottom', 'right');
          }
        );
    } else {
      this.showNotification('warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }*/

    onCancel(): void {
      this.dialogRef.close();
    }
    onSubmit() {
      if (this.vaccinationForm.valid) {
        const vaccinationNameControl = this.vaccinationForm.get('vaccinationName');
        const vaccinationTypeControl = this.vaccinationForm.get('vaccinationType');
        const manufacturerControl = this.vaccinationForm.get('Manufacturer');
        const sideEffectsControl = this.vaccinationForm.get('sideEffects');
    //check if these variables are truthy before accessing their value property to avoid accessing properties of null
        if (vaccinationNameControl && vaccinationTypeControl && manufacturerControl && sideEffectsControl) {
          const updatedVaccination: Vaccination = {
            vaccineLabel: vaccinationNameControl.value,
            vaccineType: vaccinationTypeControl.value,
            vaccineManufacturer: manufacturerControl.value,
            sideEffects: sideEffectsControl.value,
            idVaccination: undefined
          };
          this.vaccinationService.checkIfvaccExists(updatedVaccination.vaccineLabel).subscribe
          ((exists:boolean) => {
            if(exists){
              this.showNotification(
                'snackbar-warning',
                'vaccination already exist',
                'top',
                'center'
              );
            }else{
          this.vaccinationService.updateVaccination(updatedVaccination, this.data.vaccination.idVaccination)
            .subscribe(
              () => {
                this.showNotification('snackbar-success', 'Vaccination updated successfully', 'bottom', 'center');
                this.dialogRef.close();
              },
              (error) => {
                console.error('Error updating vaccination:', error);
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
