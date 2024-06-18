import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Appointment } from 'app/patient/appointments/appointmentModel';
@Injectable()
export class AppointmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:8093/careplan';
  isTblLoading = true;
 
  // Temporarily stores data from dialogs
  dialogData!: Appointment;
  
  constructor(private httpClient: HttpClient) {
    super();
  }
  

  getAllApp(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.API_URL+'/all-appointment');
  }
  deleteApp(App_ky: number): Observable<void> {
    console.log('Attemping to remove appointment with ID:',App_ky);
    return this.httpClient.delete<void>(`${this.API_URL}/delete-appointment/${App_ky}`);
  }

}