import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SurgicalService } from './surgical.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Surgical } from './surgical.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { DeleteSurgicalComponent } from './dialog/delete/delete.component';
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
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AddSurgicalComponent } from './dialog/add-surgical/add-surgical.component';

@Component({
  selector: 'app-allSurgical',
  templateUrl: './allSurgical.component.html',
  styleUrls: ['./allSurgical.component.scss'],
})
export class AllSurgicalComponent implements OnInit{
  displayedColumns: string[] = ['select', 'cptky', 'cptCode', 'cptDesc','cptCategory', 'actions'];
  dataSource!: MatTableDataSource<Surgical>;
  selection = new SelectionModel<Surgical>(true, []);
  exampleDatabase?:SurgicalService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  public surgicals: Surgical[] = [];
  public searchTerm: string = '';
  constructor(
    private surService: SurgicalService,
    private dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<Surgical>([]);
    this.loadData();
   
    // Autres appels de méthodes ici...
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.surService.getAllSurgicals().subscribe((data: Surgical[]) => {
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
  const dialogRef = this.dialog.open(AddSurgicalComponent, {
    width: '600px', // Définir la largeur de la modal selon vos besoins
    height: '400px',
    // Autres configurations de la modal
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Traiter les données retournées par la modal si nécessaire
    this.refresh();
  });
}

getAllSurgicals(): void {
  this.surService.getAllSurgicals().subscribe(
    (response: Surgical[]) => {
      this.surgicals = response;
      console.log(this.surgicals);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public searchSurgicals(key: string): void {
  console.log(key); // Affiche la clé de recherche dans la console
  if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
    const results: Surgical[] = [];
    for (const allergy of this.surgicals) {
      if (allergy.cptCode.toLowerCase().includes(key.toLowerCase())
       ) {
        results.push(allergy);
      }
    }
    this.surgicals = results; // Met à jour la liste des surgicals avec les résultats de la recherche
  } else {
    this.getAllSurgicals(); // Si la clé de recherche est vide, affiche toutes les allergies
  }
}
openDeleteModal(surgical: Surgical): void {
  const dialogRef = this.dialog.open(DeleteSurgicalComponent, {
    width: '400px',
    data: surgical // Passer l'surgical sélectionnée au dialogue de suppression
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Delete modal closed with result:', result);
    if (result === true) {
      // Supprimer l'surgical de la base de données
      this.surService.deleteSurgical(surgical.cptky).subscribe(() => {
        console.log('Surgical successfully removed from the database');
        // Supprimer l'surgical du tableau du modèle
        this.surgicals = this.surgicals.filter(a => a !== surgical);
        this.showNotification(
          'snackbar-success',
          ' Surgical Delete Successfully',
          'top',
          'center'
        );
        this.refresh();
      }, (error) => {
        console.error('Error removing surgical from the database:', error);
        this.showNotification('error', 'Failed to remove surgical ', 'top', 'center');
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
viewSurgicalDetails(surgical: Surgical): void {
  // Navigate to the details page with the ID of the selected vaccine
  this.router.navigate(['/admin/surgical/view/details/surgical', surgical.cptky]);
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

exportExcel() {
  const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((surgical) => ({
    'cptky':surgical.cptky,
    'cptCode':surgical.cptCode,
    'cptDesc': surgical.cptDesc,
    'cptCatgeory': surgical.cptCategory
  }));

  TableExportUtil.exportToExcel(exportData, 'surgical');
}



}




