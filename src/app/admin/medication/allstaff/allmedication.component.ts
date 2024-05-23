import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MedicationService } from './medication.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Medication } from './medication.model';
import { DataSource } from '@angular/cdk/collections';
import { DeleteMedicationComponent } from './dialog/delete/delete.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { MedicationResponse } from '../MedicationResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AddMedicationComponent } from './dialog/add-medication/add-medication.component';
@Component({
  selector: 'app-allmedication',
  templateUrl: './allmedication.component.html',
  styleUrls: ['./allmedication.component.scss'],
})
export class AllMedicationComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'medicationCode',
    'medicationName',
    'medicationType',
    'medicationStrength',
    'medicationDosageForm',
    'ingredients',
    'actions',
  ];
  dataSource!: MatTableDataSource<MedicationResponse>;
  selection = new SelectionModel<MedicationResponse>(true, []);
  exampleDatabase?:MedicationService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  public medications: MedicationResponse[] = [];
  public searchTerm: string = '';
  originalDataSource: MedicationResponse[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public medicationService: MedicationService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
    super();
  }
  

  ngOnInit(): void {
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<MedicationResponse>([]);
    this.loadData();
   
    // Autres appels de méthodes ici...
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.medicationService.getAllMedications().subscribe((data: MedicationResponse[]) => {
      this.dataSource = new MatTableDataSource(data); // Initialise dataSource avec les données
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // Filter data based on input
    fromEvent(this.filter?.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.dataSource.filter = text.trim().toLowerCase();
      });
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
// Méthode pour ouvrir la modal d'ajout d'allergie
openAddModal(): void {
  const dialogRef = this.dialog.open(AddMedicationComponent, {
    width: '600px', // Définir la largeur de la modal selon vos besoins
    height: '500px',
    // Autres configurations de la modal
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Traiter les données retournées par la modal si nécessaire
    this.refresh();
  });
}

  getAllMedications(): void {
    this.medicationService.getAllMedications().subscribe(
      (response: MedicationResponse[]) => {
        this.medications = response;
        console.log(this.medications);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchMedications(key: string): void {
    console.log(key); // Affiche la clé de recherche dans la console
    if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
      const results: MedicationResponse[] = [];
      for (const medication of this.medications) {
        if (medication.medicationName.toLowerCase().includes(key.toLowerCase())
          || medication.medicationCode.toLowerCase().includes(key.toLowerCase())
         ) {
          results.push(medication);
        }
      }
      this.medications = results; 
      this.getAllMedications(); 
    }
  }

  openDeleteModal(medication: MedicationResponse): void {
    const dialogRef = this.dialog.open(DeleteMedicationComponent, {
      width: '700px',
      data: medication // Passer l'ingredient sélectionnée au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'ingredient de la base de données
        this.medicationService.deleteMedication(medication.medicationKy).subscribe(() => {
          console.log('Medication successfully removed from the database');
          // Supprimer l'ingredient du tableau du modèle
          this.medications = this.medications.filter(a => a !== medication);
          this.showNotification(
            'snackbar-success',
            ' Medication Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing medication from the database:', error);
          this.showNotification('error', 'Failed to medication allergy', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      }
    });
  }
  
  
  
  onCancelClick(): void {
    console.log('Delete operation canceled.');
  }

/*viewAllergyDetails(allergy: Allergy): void {
  this.router.navigate(['/admin/allergy/view/details/allergy', allergy.allergyKy]);
}*/
viewMedicationDetails(medication: MedicationResponse): void {
  // Navigate to the details page with the ID of the selected vaccine
  this.router.navigate(['/admin/medication/view/details/medication', medication.medicationKy]);
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


exportExcel() {
  const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((medication) => ({
    'Medication Code': medication.medicationCode,
    'Medication Name': medication.medicationName,
    'Medication Type': medication.medicationType,
    'Medication Strength': medication.medicationStrength,
    'Medication Dosage Form': medication.medicationDosageForm,
    'Ingredients': Array.isArray(medication.ingredients) ? medication.ingredients.join(', ') : '', 
    // Vérifie si medication.ingredients est un tableau avant d'appeler join()
    // 'Ingredients': medication.ingredients.map(ingredient => ingredient.name).join(', '), // Si ingredients est un tableau d'objets avec une propriété 'name'
  }));
  
  TableExportUtil.exportToExcel(exportData, 'medication');
}

  
  
}
