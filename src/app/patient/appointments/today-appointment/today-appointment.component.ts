import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointmentModel';
import { AppointmentService } from '../appointmentservice';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-today-appointment',
  templateUrl: './today-appointment.component.html',
  styleUrls: ['./today-appointment.component.scss'],
})

export class TodayAppointmentComponent implements OnInit {

  first: string = '';
  last: string = '';

  displayedColumns = [
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

  dataSource: Appointment[] = [];
  originalDataSource: Appointment[] = [];

  constructor(private appointmentService: AppointmentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.first = currentUser.firstname;
    this.last = currentUser.lastname;

    this.getAllApp();
  }

  refresh() {
    this.getAllApp();
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

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(appointment =>
        appointment.doctor.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource = this.originalDataSource; // Réinitialiser les données d'origine en cas de recherche vide
    }
  }
}





