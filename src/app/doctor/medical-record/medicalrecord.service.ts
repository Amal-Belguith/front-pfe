import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecord } from './medicalrecord.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8090/record';
  constructor(private http:HttpClient) { }



  addRecord(model:MedicalRecord): Observable<any>{
    return this.http.post(this.apiServerUrl+"/add",model);
  }
  
  getAllRecord(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(this.apiServerUrl+"/all");
  }

}