import { Component,ViewChild } from '@angular/core';
import { AdverseEffectService } from '../../services/adverse-effect.service';
import * as XLSX from 'xlsx';

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

  constructor(private adveff: AdverseEffectService) {}

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
        const AdvEff: adveffData[] = XLSX.utils.sheet_to_json<adveffData>(sheet);
  
        let allAddEffExist = true;
        for (const addeff of AdvEff) {
          const adverseEffectName = addeff.adverseEffectName;
  
          this.adveff.checkIfadveffExists(adverseEffectName).subscribe({
            next: (exists: boolean) => {
              if (exists) {
                alert(`The Adverse Effect '${adverseEffectName}' already exist`);
              } else {
                allAddEffExist = false;
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the Adverse Effect :', error);
              allAddEffExist = false;
            }
          });
        }
  
        setTimeout(() => {
          if (!allAddEffExist) {
            this.adveff.addadveffFile(formData).subscribe({
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
            console.log('No files selected or all Addverst Effect already exist');
          }
        }, 1000); // Attendre une seconde pour permettre la vérification des ingrédients avant d'ajouter le fichier
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
    }
  }
  
  
}
