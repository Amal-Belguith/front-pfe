
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Personal } from '../personal.model';

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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-allpersonals',
  templateUrl: './allpersonals.component.html',
  styleUrls: ['./allpersonals.component.scss'],
})
export class AllpersonalsComponent implements OnInit {

  displayedColumns = [
      'firstname',
      'lastname',
      'email',
      'password',
      'role',
      'department',
      'uploadedFile',
      'actions'
  ];
 
  dataSource: Personal[] = []; 
  originalDataSource: Personal[] = [];
  constructor(private personalService: PersonalService,   private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.personalService.getAllPersonal().subscribe(data => {
      this.originalDataSource = data;
      this.dataSource = data;
    });
  }
  refresh() {
    this.getAllPersonal();
  }

  getAllPersonal(): void {
    this.personalService.getAllPersonal().subscribe((data: Personal[]) => {
      this.dataSource = data; 
    }, (error: any) => {
      this.snackBar.open('Error loading personals', 'Ok', {
        duration: 2000,
      });
    });
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(Personal =>
        Personal.firstname.toLowerCase().includes(filterValue.toLowerCase()) 
      );
    } else {
      this.dataSource = this.originalDataSource; // Reset to original data on empty search
    }
  }

  deletePersonal(user_ky: number): void {
    this.personalService.deletePersonal(user_ky).subscribe({
      next: () => {
        console.log('Staff deleted successfully');
        this.dataSource = this.dataSource.filter(personal => personal.user_ky !== user_ky);
        alert('Staff deleted successfully');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Une erreur s\'est produite lors de la suppression de personnel:', error);
      }
    });
  }


  exportExcel(): void {
    const exportData = this.dataSource.map((personal) => ({
      firstname: personal.firstname,
      lastname: personal.lastname,
      email: personal.email,
      password: personal.password,
      role: personal.role,
      department: personal.department,
      uploadedFile: personal.uploadedFile,
    }));

    TableExportUtil.exportToExcel(exportData, 'personal');
  }
}
