import { Component,ViewChild } from '@angular/core';
import { AdverseEffectService } from '../../services/adverse-effect.service';
import * as XLSX from 'xlsx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

interface adveffData {
  adverseEffectName: string;
} 
@Component({
  selector: 'app-upload-file-adverse-effect',
  templateUrl: './upload-file-adverse-effect.component.html',
  styleUrls: ['./upload-file-adverse-effect.component.scss']
})

export class UploadFileadveffComponent {
  selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private adveff: AdverseEffectService,private snackBar: MatSnackBar) {}

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
        const AdvEff: adveffData[] = XLSX.utils.sheet_to_json<adveffData>(sheet);

        let allAddEffExist = true;
        let effectsChecked = 0;

        for (const addeff of AdvEff) {
          const adverseEffectName = addeff.adverseEffectName;

          this.adveff.checkIfadveffExists(adverseEffectName).subscribe({
            next: (exists: boolean) => {
              effectsChecked++;
              if (exists) {
                this.showNotification(
                  'snackbar-error',
                  `The Adverse Effect '${adverseEffectName}}' already exists`,
                  'top',
                  'center'
                );
              } else {
                allAddEffExist = false;
              }
              if (effectsChecked === AdvEff.length) {
                this.processFileUpload(allAddEffExist);
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the Adverse Effect:', error);
              allAddEffExist = false;
              effectsChecked++;
              if (effectsChecked === AdvEff.length) {
                this.processFileUpload(allAddEffExist);
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

  private processFileUpload(allAddEffExist: boolean) {
    if (!allAddEffExist && this.selectedFile) { // Ajouter une vérification pour this.selectedFile
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      fetch('http://localhost:8093/parameterization/upload-data-adverseEffect', {
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
      console.log('No files selected or all Adverse Effects already exist');
      this.showNotification(
        'snackbar-warning',
        ' No files selected or all Adverse Effects already exist',
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
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
