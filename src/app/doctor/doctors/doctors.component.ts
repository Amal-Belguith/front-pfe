import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'app/authentication/user.Model';
import { PatientsService } from '../patients/patient.service';
import { Personal } from 'app/admin/personnel/personal.model';
import { PersonalService } from 'app/admin/personnel/allpersonals/personals.service';
import { TableExportUtil } from '@shared';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {

  displayedColumns: string[] = [
    'user_ky',
    'firstname',
    'lastname',
    'email',
    'department'

  ];

  dataSource: Personal[] = [];
  originalDataSource: Personal[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private persservice: PersonalService
  ) { }

  ngOnInit(): void {
    this.getAllPersonal();
  }

  getAllPersonal(): void {
    this.persservice.getAllPersonal().subscribe(
      (data: Personal[]) => {
        // Filtrer uniquement les patients
        const doctors = data.filter(user => user.role === Role.DOCTOR);
        console.log('Filtered doctors data:', doctors); // Log filtered data

        this.dataSource = doctors;
        this.originalDataSource = doctors; // Conservez une copie filtrée si nécessaire
      },
      (error: any) => {
        this.snackBar.open('Error loading doctors', 'Ok', {
          duration: 2000,
        });
      }
    );
  }
  refresh(): void {
    this.getAllPersonal();
  }

  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.map((personal) => ({
      'user_ky': personal.user_ky,
      'firstname': personal.firstname,
      'lastname': personal.lastname,
      'email': personal.email,
      'department': personal.department
      
    }));
    
    // Assuming TableExportUtil.exportToExcel() is properly implemented to export data to Excel
    TableExportUtil.exportToExcel(exportData, 'personals');
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(personal =>
        personal.firstname.toLowerCase().includes(filterValue.toLowerCase()) || personal.lastname.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource = this.originalDataSource; // Réinitialisez les données d'origine lors d'une recherche vide
    }
  }
}
