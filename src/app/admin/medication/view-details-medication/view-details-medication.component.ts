import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicationResponse } from '../MedicationResponse';
import { MatDialog } from '@angular/material/dialog';
import { EditMedicationComponent } from './dialogs/edit-medication/edit-medication.component';
import { MedicationService } from '../allstaff/medication.service';
import { Ingredient } from '../MedicationResponse';

@Component({
  selector: 'app-view-details-medication',
  templateUrl: './view-details-medication.component.html',
  styleUrls: ['./view-details-medication.component.scss']
})
export class ViewDetailsMedicationComponent implements OnInit {
  public medication: MedicationResponse | undefined;
  public isLoading = true;
  isInputDisabled: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private medicationService: MedicationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.getMedicationDetails();
  }

  getMedicationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicationService.getMedicationById(Number(id)).subscribe(
        (medication: MedicationResponse) => {
          this.medication = medication;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching Medication details:', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  openUpdateModal(): void {
    const dialogRef = this.dialog.open(EditMedicationComponent, {
      width: '600px',
      height: '500px',
      data: { medication: this.medication } // Pass allergy data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after modal is closed, such as refreshing allergy details
      this.getMedicationDetails();
      this.isLoading = true;
    });
  }
  getIngredientNames(ingredients: Ingredient[]): string {
    return ingredients ? ingredients.map(ingredient => ingredient.ingredientName).join(', ') : '';
  }
  
}

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const allergyId = +params['id'];
      console.log('Allergy ID:', allergyId);

      this.allergyService.getAllergyById(allergyId).subscribe(
        (data: Allergy) => {
          this.allergy = data;
          console.log('Allergy details:', this.allergy);
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching allergy details:', error);
          this.isLoading = false;
        }
      );
    });
  }
  getSymptomNames(symptoms: any[]): string {
    if (!symptoms) {
      return '';
    }
    return symptoms.map(symptom => symptom.symptomName).join(', ');
  }
  openEditModal(allergy: Allergy): void {
    console.log('Editing allergy:', allergy);
    // Vous devrez peut-être ajuster cette partie en fonction de la manière dont vous récupérez les symptômes
    this.symptomService.getAllSymptoms().subscribe(symptoms => {
      const dialogRef = this.dialog.open(EditAllergyComponent, {
        width: '600px',
        data: {
          allergy: allergy,
          symptoms: symptoms // Passer les symptômes récupérés au composant de modification
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The edit dialog was closed');
        // Traiter les données retournées par le modal si nécessaire
      });
    });
  }
  
  
}*/
