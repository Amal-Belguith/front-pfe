import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../allingredient/ingredient.model';
import { MatDialog } from '@angular/material/dialog';
import { EditIngredientComponent } from './dialogs/edit-ingredient/edit-ingredient.component';
import { IngredientService } from '../allingredient/ingredient.service';

@Component({
  selector: 'app-view-details-ingredient',
  templateUrl: './view-details-ingredient.component.html',
  styleUrls: ['./view-details-ingredient.component.scss']
})
export class ViewDetailsIngredientComponent implements OnInit {
  public ingredient: Ingredient | undefined;
  public isLoading = true;
  isInputDisabled: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.getIngredientDetails();
  }

  getIngredientDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ingredientService.getIngredientById(Number(id)).subscribe(
        (ingredient: Ingredient) => {
          this.ingredient = ingredient;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching ingredient details:', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  openUpdateModal(): void {
    const dialogRef = this.dialog.open(EditIngredientComponent, {
      width: '600px',
      height: '300px',
      data: { ingredient: this.ingredient } // Pass allergy data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after modal is closed, such as refreshing allergy details
      this.getIngredientDetails();
      this.isLoading = true;
    });
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
