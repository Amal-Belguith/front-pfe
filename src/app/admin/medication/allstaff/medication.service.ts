import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medication } from './medication.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
import { MedicationResponse } from '../MedicationResponse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicationService  {
  private readonly API_URL = 'http://localhost:8093/parameterization';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Medication[]> = new BehaviorSubject<Medication[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: MedicationResponse;
  constructor(private httpClient: HttpClient) {}
  /*get data(): Medication[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  /** CRUD METHODS */
  getAllMedications(): Observable<MedicationResponse[]> {
    return this.httpClient.get<MedicationResponse[]>(this.API_URL+"/all-medication")

  }
   

  checkIfMedicationExists(medicationName: string, medicationCode: string): Observable<boolean> {
  return this.httpClient.get<boolean>(`${this.API_URL}/exists-medication?medicationName=${medicationName}&medicationCode=${medicationCode}`);
  }
   
  addMedication(medication: MedicationResponse):Observable<any> {
    
    return this.httpClient.post(this.API_URL+'/add-medication', medication);
    
  }

  addMedicationFile(formData: FormData): Observable<any> {
 
    return this.httpClient.post(`${this.API_URL}/upload-data-medication`, formData);
  }
  
  deleteMedication(medicationKy: number): Observable<void> {
    console.log('Attemping to remove medication with ID:',medicationKy);
    return this.httpClient.delete<void>(`${this.API_URL}/delete-medication/${medicationKy}`);
  }
  updateMedication(medicationKy: any, updatedMedication: any):Observable<any>{
    return this.httpClient.put(`${this.API_URL}/edit-medication/${medicationKy}`, updatedMedication);
  }

  searchMedication(medicationName: string): Observable<MedicationResponse[]> {
    return this.httpClient.get<MedicationResponse[]>(`${this.API_URL}/search/${medicationName}`);
  }

  getMedicationById(medicationKy:any){
    return this.httpClient.get<MedicationResponse>(`${this.API_URL}/details-medication/${medicationKy}`);
  }
  createMedication(model:MedicationResponse): Observable<any>{
    return this.httpClient.post(this.API_URL + '/add-medication', model);
  }

}
