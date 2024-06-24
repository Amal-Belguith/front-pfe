import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Personal } from '../personal.model';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';

import { PersonalService } from './personals.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { AddPersonalComponent } from './dialogs/add-personal/add-personal.component';
import { DeleteStaffComponent } from './dialogs/delete/delete.component';

@Component({
  selector: 'app-allpersonals',
  templateUrl: './allpersonals.component.html',
  styleUrls: ['./allpersonals.component.scss'],
})
export class AllpersonalsComponent implements OnInit {

  displayedColumns: string[] = [
      'select',
      'user_ky',
      'firstname',
      'lastname',
      'email',
      'password',
      'role',
      'department',
      'uploadedFile',
      'actions'
  ];
 
  dataSource!: MatTableDataSource<Personal>;
  selection = new SelectionModel<Personal>(true, []);
  exampleDatabase?:PersonalService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  public staffs: Personal[] = [];
  public searchTerm: string = '';
  constructor(
    private personalService: PersonalService,
    private dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<Personal>([]);
    this.loadData();
   
    // Autres appels de méthodes ici...
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.personalService.getAllPersonal().subscribe((data: Personal[]) => {
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
  const dialogRef = this.dialog.open(AddPersonalComponent, {
    width: '600px', // Définir la largeur de la modal selon vos besoins
    height: '600px',
    // Autres configurations de la modal
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Traiter les données retournées par la modal si nécessaire
    this.refresh();
  });
}

  getAllPersonal(): void {
    this.personalService.getAllPersonal().subscribe(
      (response: Personal[]) => {
        this.staffs = response;
        console.log(this.staffs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchStaff(key: string): void {
    console.log(key); // Affiche la clé de recherche dans la console
    if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
      const results: Personal[] = [];
      for (const staff of this.staffs) {
        if (staff.firstname.toLowerCase().includes(key.toLowerCase())
          || staff.lastname.toLowerCase().includes(key.toLowerCase())
         ) {
          results.push(staff);
        }
      }
      this.staffs = results; // Met à jour la liste des ingredients avec les résultats de la recherche
    } else {
      this.getAllPersonal(); // Si la clé de recherche est vide, affiche toutes les allergies
    }
  }

  openDeleteModal(staff: Personal): void {
    const dialogRef = this.dialog.open(DeleteStaffComponent, {
      width: '700px',
      data: staff // Passer l'ingredient sélectionnée au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'ingredient de la base de données
        this.personalService.deletePersonal(staff.user_ky).subscribe(() => {
          console.log('Staff successfully removed from the database');
          // Supprimer l'ingredient du tableau du modèle
          this.staffs = this.staffs.filter(a => a !== staff);
          this.showNotification(
            'snackbar-success',
            ' Staff Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing Staff from the database:', error);
          this.showNotification('error', 'Failed to remove Staff ', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      }
    });
  }

  onCancelClick(): void {
    console.log('Delete operation canceled.');
  }

  viewStaffDetails(staff: Personal): void {
    // Navigate to the details page with the ID of the selected vaccine
    this.router.navigate(['/admin/personnel/view/details/staff', staff.user_ky]);
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
    const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((personal) => ({
      'user_ky':personal.user_ky,
      'firstname': personal.firstname,
      'lastname': personal.lastname,
      'email': personal.email,
      'password': personal.password,
      'role': personal.role,
      'department': personal.department,
      'uploadedFile': personal.uploadedFile
    }));
  
    TableExportUtil.exportToExcel(exportData, 'personal');
  }

  
}
