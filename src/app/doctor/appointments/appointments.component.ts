import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/patient/appointments/appointmentModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'app/patient/appointments/appointmentservice';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
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
    'injury',
    'actions'
  ];

  dataSource: Appointment[] = []; 
  originalDataSource: Appointment[] = [];
  doctorDepartment: string = ''; // Variable pour stocker le département du médecin
  userKy: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private appservice: AppointmentService
  ) { }

  ngOnInit(): void {
    // Récupérer le département de l'utilisateur actuellement connecté depuis le stockage local
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.doctorDepartment = currentUser.department;

    // Charger tous les rendez-vous depuis le service (sans filtre par département)
    this.getAllApp();
  }

  getAllApp(): void {
    this.appservice.getAllApp().subscribe(
      (data: Appointment[]) => {
        // Filtrer les rendez-vous par département du médecin
        this.originalDataSource = data.filter(appointment =>
          appointment.doctor.toLowerCase() === this.doctorDepartment.toLowerCase()
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
  refresh(){
    this.getAllApp();
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(appointment =>
        appointment.first.toLowerCase().includes(filterValue.toLowerCase()) || appointment.last.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource = this.originalDataSource; // Réinitialisez les données d'origine lors d'une recherche vide
    }
  }
}
