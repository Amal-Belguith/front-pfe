import { Component,ViewChild } from '@angular/core';
import { PhyTrCategoryService } from '../../services/physical-treatment-category.service';
import * as XLSX from 'xlsx';

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

  constructor(private trcatser: PhyTrCategoryService) {}

  onFileSelected(event: any) {
    // Récupérer le fichier sélectionné à partir de l'objet event
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      // Lire le fichier Excel
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const data = new Uint8Array(fileReader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
  
        // Récupérer la première feuille de calcul
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
  
        // Convertir la feuille de calcul en tableau de données
        const TrCatData: trcatData[] = XLSX.utils.sheet_to_json<trcatData>(sheet);
  
        // Vérifier l'existence de chaque ingrédient dans le fichier Excel
        let allTrCatExist = true;
        for (const trcateg of TrCatData) {
          const phyCategoryName = trcateg.phyCategoryName;
  
          this.trcatser.checkIfTrCatExists(phyCategoryName).subscribe({
            next: (exists: boolean) => {
              if (exists) {
                alert(`The Treatment Category '${phyCategoryName}' already exist`);
              } else {
                allTrCatExist = false;
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the Treatment Category :', error);
              allTrCatExist = false;
            }
          });
        }
  
        setTimeout(() => {
          if (!allTrCatExist) {
            this.trcatser.addTrCatFile(formData).subscribe({
              next: (data) => {
                console.log('The file has been successfully added to the database', data);
                alert('File Added Successfully');
               
                this.selectedFile = null;
              },
              error: (error) => {
                console.error('Une erreur s\'est produite lors de l\'ajout du fichier :', error);
              }
            });
          } else {
            console.log('No files selected or all Treatments Categories already exist');
          }
        }, 1000); // Attendre une seconde pour permettre la vérification des ingrédients avant d'ajouter le fichier
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
    }
  }
  
  
}
