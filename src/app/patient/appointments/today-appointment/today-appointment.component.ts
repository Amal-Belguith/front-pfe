import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../appointmentModel';
import { AppointmentService } from '../appointmentservice';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteAppComponent } from './dialogs/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-today-appointment',
  templateUrl: './today-appointment.component.html',
  styleUrls: ['./today-appointment.component.scss'],
})

export class TodayAppointmentComponent implements OnInit {

  first: string = '';
  last: string = '';
  public appointments: Appointment[] = [];

  displayedColumns = [
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
      'injury',
      'Actions'
  ];

  dataSource: Appointment[] = [];
  originalDataSource: Appointment[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  constructor(private appointmentService: AppointmentService, private snackBar: MatSnackBar,private router: Router,private dialog: MatDialog,) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.first = currentUser.firstname;
    this.last = currentUser.lastname;

    this.getAllApp();
  }

  refresh() {
    this.getAllApp();
  }
  isTodayOrFuture(date: string): boolean {
    const today = new Date();
    const appointmentDate = new Date(date);
    return appointmentDate >= today;
  }

  getAllApp(): void {
    this.appointmentService.getAllApp().subscribe(
      (data: Appointment[]) => {
        // Filtrer les rendez-vous par nom et prénom de l'utilisateur actuel
        this.originalDataSource = data.filter(appointment =>
          appointment.first.toLowerCase() === this.first.toLowerCase() &&
          appointment.last.toLowerCase() === this.last.toLowerCase()
        );
        this.dataSource = this.originalDataSource;
      },
      (error: any) => {
        this.snackBar.open('Error loading appointments', 'Ok', {
          duration: 2000,
        });
      }
    );
  }
   editAppointment(row: any): void {
    this.router.navigate(['/patient/appointments/update'], { queryParams: row });
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(appointment =>
        appointment.doctor.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource = this.originalDataSource; // Réinitialiser les données d'origine en cas de recherche vide
    }
  }

  openDeleteModal(app: Appointment): void {
    const dialogRef = this.dialog.open(DeleteAppComponent, {
      width: '400px',
      data: app // Passer l'ingredient sélectionnée au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'ingredient de la base de données
        this.appointmentService.deleteApp(app.app_ky).subscribe(() => {
          console.log('Appointment successfully removed');
          this.appointments = this.appointments.filter(a => a !== app);
          this.showNotification(
            'snackbar-success',
            ' Appointment Delete Successfully...!!!',
            'top',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing Appointment from the database:', error);
          this.showNotification('snackbar-error', 'Failed to remove Appointment ', 'top', 'center');
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





