import { Component, OnInit } from '@angular/core';
import { Role, User } from 'app/authentication/user.Model';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { PatientsService } from './patient.service';
import { TableExportUtil } from '@shared';



@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

  displayedColumns: string[] = [
    'user_ky',
    'firstname',
    'lastname',
    'email',
    'careplan'
  ];

  dataSource: User[] = [];
  originalDataSource: User[] = [];

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

  refresh(): void {
    this.getAllPatient();
  }

  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.map((patient) => ({
      'user_ky': patient.user_ky,
      'firstname': patient.firstname,
      'lastname': patient.lastname,
      'email': patient.email,
      
    }));
    
    // Assuming TableExportUtil.exportToExcel() is properly implemented to export data to Excel
    TableExportUtil.exportToExcel(exportData, 'patients');
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(patient =>
        patient.firstname.toLowerCase().includes(filterValue.toLowerCase()) || patient.lastname.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource = this.originalDataSource; // Réinitialisez les données d'origine lors d'une recherche vide
    }
  }
}