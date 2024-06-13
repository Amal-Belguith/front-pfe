import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
import { Appointment } from 'app/patient/appointments/appointmentModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly API_URL = 'http://localhost:8092/appointment';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Appointment;
  constructor(private httpClient: HttpClient) {}
  /*get data(): Ingredient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  
  /** CRUD METHODS */

  
  
  addApp(app: Appointment): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/add`, app);
  }

  updateApp(Appky: number, updatedApp: Appointment): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/update/${Appky}`, updatedApp);
  }
  

  deleteApp(App_ky: number): Observable<void> {
    console.log('Attemping to remove appointment with ID:',App_ky);
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${App_ky}`);
  }
  
  getAllApp(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.API_URL+'/all');
  }


  
  
}
