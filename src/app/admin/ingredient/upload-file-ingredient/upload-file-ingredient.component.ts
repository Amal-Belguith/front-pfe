import { Component } from '@angular/core';
import { IngredientService } from '../allingredient/ingredient.service';
import * as XLSX from 'xlsx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

interface IngredientData {
  ingredient_name: string;
}

@Component({
  selector: 'app-upload-file-ingredient',
  templateUrl: './upload-file-ingredient.component.html',
  styleUrls: ['./upload-file-ingredient.component.scss']
})
export class UploadFileIngredientComponent {
  selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private ingredientService: IngredientService,private snackBar: MatSnackBar,) {}

  onFileSelected(event: any) {
    // Récupérer le fichier sélectionné à partir de l'objet event
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      // Lire le fichier Excel
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const data = new Uint8Array(fileReader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Récupérer la première feuille de calcul
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convertir la feuille de calcul en tableau de données
        const ingredientsData: IngredientData[] = XLSX.utils.sheet_to_json<IngredientData>(sheet);

        // Vérifier l'existence de chaque ingrédient dans le fichier Excel
        let allIngredientsExist = true;
        let ingredientsChecked = 0;

        for (const ingredient of ingredientsData) {
          const ingredientName = ingredient.ingredient_name;

          this.ingredientService.checkIfIngredientExists(ingredientName).subscribe({
            next: (exists: boolean) => {
              ingredientsChecked++;
              if (exists) {
                this.showNotification(
                  'snackbar-error',
                  `The ingredient '${ingredientName}' already exists`,
                  'top',
                  'center'
                );
              } else {
                allIngredientsExist = false;
              }
              if (ingredientsChecked === ingredientsData.length) {
                this.processFileUpload(allIngredientsExist);
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the ingredient:', error);
              allIngredientsExist = false;
              ingredientsChecked++;
              if (ingredientsChecked === ingredientsData.length) {
                this.processFileUpload(allIngredientsExist);
              }
            }
          });
        }
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
      this.showNotification(
        'snackbar-warning',
        'No files selected',
        'top',
        'center'
      );
      
    }
  }

  private processFileUpload(allIngredientsExist: boolean) {
    if (!allIngredientsExist && this.selectedFile) { // Ajouter une vérification pour this.selectedFile
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      fetch('http://localhost:8093/parameterization/upload-data-ingredient', {
        method: 'POST',
        body: formData
        // Note: Content-Type is automatically set by FormData
      })
      .then(response => response.json())
      .then(data => {
        console.log('File upload response:', data);
        this.showNotification(
          'snackbar-success',
          ' File Added Successfully',
          'top',
          'center'
        );
        this.selectedFile = null;
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.log('No files selected or all ingredients already exist');
      this.showNotification(
        'snackbar-warning',
        ' No files selected or all ingredients already exist',
        'top',
        'center'
      );
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
}
