import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CarePlan } from 'app/doctor/careplan/careplan.model';
import { CarePlanService } from './careplans.service';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { DeleteComponent } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-careplans',
  templateUrl: './careplans.component.html',
  styleUrls: ['./careplans.component.scss'],
})
export class CarePlansComponent implements OnInit {

  public careplan:CarePlan[]=[]

  displayedColumns: string[] = [
    'care_ky',
    'phyAss',
    'psyAss',
    'painAss',
    'vital',
    'obq1',
    'nurCare',
    'medAdd',
    'medProc',
    'techCare',
    'obq2',
    'specGol',
    'shortGol',
    'longGol',
    'obq3',
    'userKy',
    'monitor',
    'actions'

  ];

  dataSource: CarePlan[] = [];
  originalDataSource: CarePlan[] = [];
  public cares: CarePlan[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private carservice: CarePlanService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCarePlans();
  }

  getCarePlans(): void {
    this.carservice.getCarePlans().subscribe(
      (data: CarePlan[]) => {
        this.originalDataSource = data;
        this.dataSource= this.originalDataSource;
      },
      (error: any) => {
        this.snackBar.open('Error loading Care Plans', 'Ok', {
          duration: 2000,
        });
      }
    );
  }

  refresh(): void {
    this.getCarePlans();
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(care =>
        String(care.userKy).toLowerCase().includes(filterValue.toLowerCase()) 
      );
    } else {
      this.dataSource = this.originalDataSource; // Reset the original data when the search is empty
    }
  }

  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.map((care) => ({
      'Care KY': care.care_ky,
      'Physical Assessment': care.phyAss,
      'Psychological Assessment': care.psyAss,
      'Pain Assessment': care.painAss,
      'Vital': care.vital,
      'Obq1': care.obq1,
      'Nursing Care': care.nurCare,
      'Medication Added': care.medAdd,
      'Medication Procedure': care.medProc,
      'Technical Care': care.techCare,
      'Obq2': care.obq2,
      'Special Goals': care.specGol,
      'Short Goals': care.shortGol,
      'Long Goals': care.longGol,
      'Obq3': care.obq3,
      'User KY': care.userKy
    }));
    
    // Assuming TableExportUtil.exportToExcel() is properly implemented to export data to Excel
    TableExportUtil.exportToExcel(exportData, 'careplans');
  }

  openDeleteModal(care: CarePlan): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: care
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'ingredient de la base de données
        this.carservice.deleteCare(care.care_ky).subscribe(() => {
          console.log('Care Plan successfully removed');
          this.cares = this.cares.filter(a => a !== care);
          this.showNotification(
            'snackbar-success',
            ' Care Plan Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing Care Plan from the database:', error);
          this.showNotification('error', 'Failed to remove Care Plan ', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      }
    });
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
  
  onCancelClick(): void {
    console.log('Delete operation canceled.');
  }
  
}
