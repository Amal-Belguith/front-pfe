import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Appointment } from 'app/patient/appointments/appointmentModel';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class ViewappointmentComponent implements OnInit {

  public appointments: Appointment[] = [];

  displayedColumns = [
    'select',
    'app_ky',
    'first',
    'last',
    'gender',
    'mobile',
    'address',
    'email',
    'dob',
    'doctor',
    'doa',
    'timeslot',
    'injury'
  ];

  dataSource: MatTableDataSource<Appointment>;
  originalDataSource: Appointment[] = [];
  selection = new SelectionModel<Appointment>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  constructor(private appointmentService: AppointmentService, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.appointments);
  }

  ngOnInit(): void {
    this.getAllApp();
  }

  getAllApp(): void {
    this.appointmentService.getAllApp().subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
        this.originalDataSource = data;
        this.dataSource.data = this.appointments;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        this.snackBar.open('Error loading appointments', 'Ok', {
          duration: 2000,
        });
      }
    );
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource.data = this.originalDataSource.filter(appointment =>
        appointment.doctor.toLowerCase().includes(filterValue.toLowerCase()) ||
        appointment.first.toLowerCase().includes(filterValue.toLowerCase())  ||
        appointment.last.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource.data = this.originalDataSource; // Réinitialiser les données d'origine en cas de recherche vide
    }
  }
  refresh(){
    this.getAllApp();
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
  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((data) => ({
      'App Key': data.app_ky,
      'First Name': data.first,
      'Last Name': data.last,
      'Gender': data.gender,
      'Mobile': data.mobile,
      'Address': data.address,
      'Email': data.email,
      'Date of Birth': data.dob,
      'Doctor': data.doctor,
      'Date of Appointment': data.doa,
      'Timeslot': data.timeslot,
      'Injury': data.injury
    }));
  
    TableExportUtil.exportToExcel(exportData, 'appointment');
  }
  get appointmentCount(): number {
    return this.appointments.length;
  }

}

