import { Component,ViewChild } from '@angular/core';
import { PhyTrCategoryService } from '../../services/physical-treatment-category.service';
import * as XLSX from 'xlsx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

interface trcatData {
  phyCategoryName: string;
} 
@Component({
  selector: 'app-upload-file-treatment-category',
  templateUrl: './upload-file-treatment-category.component.html',
  styleUrls: ['./upload-file-treatment-category.component.scss']
})

export class UploadFiletrcatComponent {
  selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private trcatser: PhyTrCategoryService,private snackBar: MatSnackBar) {}

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
        const TrCatData: trcatData[] = XLSX.utils.sheet_to_json<trcatData>(sheet);

        // Vérifier l'existence de chaque catégorie de traitement dans le fichier Excel
        let allTrCatExist = true;
        let categoriesChecked = 0;

        for (const trcateg of TrCatData) {
          const phyCategoryName = trcateg.phyCategoryName;

          this.trcatser.checkIfTrCatExists(phyCategoryName).subscribe({
            next: (exists: boolean) => {
              categoriesChecked++;
              if (exists) {
                this.showNotification(
                  'snackbar-error',
                  `The Treatment Category '${phyCategoryName}' already exists`,
                  'top',
                  'center'
                );
              } else {
                allTrCatExist = false;
              }
              if (categoriesChecked === TrCatData.length) {
                this.processFileUpload(allTrCatExist);
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the Treatment Category:', error);
              allTrCatExist = false;
              categoriesChecked++;
              if (categoriesChecked === TrCatData.length) {
                this.processFileUpload(allTrCatExist);
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

  private processFileUpload(allTrCatExist: boolean) {
    if (!allTrCatExist && this.selectedFile) { // Ajouter une vérification pour this.selectedFile
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      fetch('http://localhost:8093/parameterization/upload-data-phycategories', {
        method: 'POST',
        body: formData
        // Note: Content-Type is automatically set by FormData
      })
      .then(response => response.json())
      .then(data => {
        console.log('File upload response:', data);
        this.showNotification(
          'snackbar-success',
          'File Added Successfully',
          'top',
          'center'
        );
        this.selectedFile = null;
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.log('No files selected or all Treatment Categories already exist');
      this.showNotification(
        'snackbar-warning',
        ' No files selected or all Treatment Categories already exist',
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
