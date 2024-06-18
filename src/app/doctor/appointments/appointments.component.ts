import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/patient/appointments/appointmentModel';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppointmentService } from 'app/patient/appointments/appointmentservice';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { FormComponent } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
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
    'user_ky',
    'consultation',
    'medicalrecord',
    'actions'
  ];

  dataSource: Appointment[] = []; 
  originalDataSource: Appointment[] = [];
  doctorDepartment: string = ''; // Variable pour stocker le département du médecin
  userKy: string = '';
  public appointments: Appointment[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private appservice: AppointmentService,
    private dialog: MatDialog
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

  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.map((appointment) => ({
      'First Name': appointment.first,
      'Last Name': appointment.last,
      'Gender': appointment.gender,
      'Mobile': appointment.mobile,
      'Address': appointment.address,
      'Email': appointment.email,
      'Date of Birth': appointment.dob,
      'Doctor': appointment.doctor,
      'Date of Appointment': appointment.doa,
      'Time Slot': appointment.timeslot,
      'Injury': appointment.injury,
      'User KY': appointment.user_ky
    }));
    
    // Assuming TableExportUtil.exportToExcel() is properly implemented to export data to Excel
    TableExportUtil.exportToExcel(exportData, 'appointments');
  }
  openDeleteModal(app: Appointment): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: app 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'ingredient de la base de données
        this.appservice.deleteApp(app.app_ky).subscribe(() => {
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
          this.showNotification('error', 'Failed to remove Appointment ', 'top', 'center');
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
