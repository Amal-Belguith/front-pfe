import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {  Surgical } from './surgical.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SurgicalService {
  private readonly API_URL = 'http://localhost:8090/procedures';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // Temporarily stores data from dialogs
  constructor(private httpClient: HttpClient) {}
  /*get data(): Ingredient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  
  /** CRUD METHODS */
  getAllSurgicals(): Observable<Surgical[]> {
    return this.httpClient.get<Surgical[]>(this.API_URL);
  }
  
  checkIfSurgicalExists(cptCode: string): Observable<boolean> {
      return this.httpClient.get<boolean>(`${this.API_URL}/exists?cptCode=${cptCode}`);
    }

  addSurgical(sugical:Surgical ): Observable<Surgical> {
     return this.httpClient.post<Surgical>(this.API_URL + '/add', sugical);
    
  }


  
  updateSurgical(cptky: any, updatedSurgical: Surgical): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/update/${cptky}`, updatedSurgical);
  }
  deleteSurgical(cptky: number): Observable<void> {
    console.log('Attemping to remove ingredient with ID:',cptky);
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${cptky}`);
  }
  
  getSurgicalById(cptky:any){
    return this.httpClient.get<Surgical>(`${this.API_URL}/details/${cptky}`);
  }

}
  
  

