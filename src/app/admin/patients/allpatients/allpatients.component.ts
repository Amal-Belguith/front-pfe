import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Role,User } from 'app/authentication/user.Model';
import { PatientsService } from 'app/doctor/patients/patient.service';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.scss'],
})
export class AllpatientsComponent
implements OnInit {

  displayedColumns: string[] = [
    'select',
    'user_ky',
    'firstname',
    'lastname',
    'email'
  ];

  dataSource: User[] = [];
  originalDataSource: User[] = [];
  selection = new SelectionModel<User>(true, []);

  constructor(
    private snackBar: MatSnackBar,
    private patservice: PatientsService
  ) { }

  ngOnInit(): void {
    this.getAllPatient();
  }

  getAllPatient(): void {
    this.patservice.getAllPatient().subscribe(
      (data: User[]) => {
        // Filtrer uniquement les patients
        const patients = data.filter(user => user.role === Role.PATIENT);
        console.log('Filtered patients data:', patients); // Log filtered data

        this.dataSource = patients;
        this.originalDataSource = patients; // Conservez une copie filtrée si nécessaire
      },
      (error: any) => {
        this.snackBar.open('Error loading patients', 'Ok', {
          duration: 2000,
        });
      }
    );
  }
  public searchPatients(key: string): void {
    console.log(key); // Affiche la clé de recherche dans la console
    if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
      const results: User[] = [];
      for (const allergy of this.dataSource) {
        if (allergy.firstname.toLowerCase().includes(key.toLowerCase())
          || allergy.lastname.toLowerCase().includes(key.toLowerCase())
         ) {
          results.push(allergy);
        }
      }
      this.dataSource = results; // Met à jour la liste des ingredients avec les résultats de la recherche
    } else {
      this.getAllPatient(); // Si la clé de recherche est vide, affiche toutes les allergies
    }
  }
  refresh(): void {
    this.getAllPatient();
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.map((data) => ({
      'User Key': data.user_ky,
      'First Name': data.firstname,
      'Last Name': data.lastname,
      'Email': data.email
    }));
  
    TableExportUtil.exportToExcel(exportData, 'patients');
  }
}