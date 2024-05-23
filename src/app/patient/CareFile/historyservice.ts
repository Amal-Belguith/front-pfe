import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
import { History } from './historyModel';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly API_URL = 'http://localhost:8090/appointment';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: History;
  constructor(private httpClient: HttpClient) {}
  /*get data(): Ingredient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  
  /** CRUD METHODS 

  
  
  addApp(app: Appointment): void {
    this.dialogData = app;

  this.httpClient.post(this.API_URL + '/add', app)
     .subscribe({
      next: (data) => {
        this.dialogData = app;
       },
       error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
     });
  }

  
  updateApp(App_ky: number, updatedApp: any): Observable<void> {
    return this.httpClient.put<void>(`${this.API_URL}/update/${App_ky}`, updatedApp);
  }
  deleteApp(App_ky: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${App_ky}`);
  }
  
  getAllApp(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.API_URL+'/all');
  }*/
  
  
}
