import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ingredient } from './ingredient.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { DeleteIngredientComponent } from './dialog/delete/delete.component';
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
import { AddIngredientComponent } from './dialog/add-ingredient/add-ingredient.component';

@Component({
  selector: 'app-allIngredient',
  templateUrl: './allIngredient.component.html',
  styleUrls: ['./allIngredient.component.scss'],
})
export class AllIngredientComponent implements OnInit{
  displayedColumns: string[] = ['select', 'ingredientKy', 'ingredientName', 'ingredientDesc', 'actions'];
  dataSource!: MatTableDataSource<Ingredient>;
  selection = new SelectionModel<Ingredient>(true, []);
  exampleDatabase?:IngredientService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  public ingredients: Ingredient[] = [];
  public searchTerm: string = '';
  constructor(
    private ingredientService: IngredientService,
    private dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<Ingredient>([]);
    this.loadData();
   
    // Autres appels de méthodes ici...
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => {
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
  const dialogRef = this.dialog.open(AddIngredientComponent, {
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

getAllIngredients(): void {
  this.ingredientService.getAllIngredients().subscribe(
    (response: Ingredient[]) => {
      this.ingredients = response;
      console.log(this.ingredients);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public searchIngredients(key: string): void {
  console.log(key); // Affiche la clé de recherche dans la console
  if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
    const results: Ingredient[] = [];
    for (const allergy of this.ingredients) {
      if (allergy.ingredientName.toLowerCase().includes(key.toLowerCase())
        || allergy.ingredientDesc.toLowerCase().includes(key.toLowerCase())
       ) {
        results.push(allergy);
      }
    }
    this.ingredients = results; // Met à jour la liste des ingredients avec les résultats de la recherche
  } else {
    this.getAllIngredients(); // Si la clé de recherche est vide, affiche toutes les allergies
  }
}
openDeleteModal(ingredient: Ingredient): void {
  const dialogRef = this.dialog.open(DeleteIngredientComponent, {
    width: '400px',
    data: ingredient // Passer l'ingredient sélectionnée au dialogue de suppression
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Delete modal closed with result:', result);
    if (result === true) {
      // Supprimer l'ingredient de la base de données
      this.ingredientService.deleteIngredient(ingredient.ingredientKy).subscribe(() => {
        console.log('Ingredient successfully removed from the database');
        // Supprimer l'ingredient du tableau du modèle
        this.ingredients = this.ingredients.filter(a => a !== ingredient);
        this.showNotification(
          'snackbar-success',
          ' Ingredient Delete Successfully',
          'top',
          'center'
        );
        this.refresh();
      }, (error) => {
        console.error('Error removing ingredient from the database:', error);
        this.showNotification('snackbar-error', 'Failed to remove ingredient ', 'top', 'center');
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
viewIngredientDetails(ingredient: Ingredient): void {
  // Navigate to the details page with the ID of the selected vaccine
  this.router.navigate(['/admin/ingredient/view/details/ingredient', ingredient.ingredientKy]);
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
  const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((ingredient) => ({
    'IngredientKy':ingredient.ingredientKy,
    'Ingredient Name': ingredient.ingredientName,
    'Ingredient Desc': ingredient.ingredientDesc
  }));

  TableExportUtil.exportToExcel(exportData, 'ingredient');
}



}




