import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdverseEffect, ICD10, Medication, Vaccination } from '../model/vaccination';
import { environment } from 'environments/environment';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8093/parameterization';
  constructor(private http:HttpClient) { }

  // Vaccination List
  getVaccination(): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(this.apiServerUrl+"/all-vaccination");
  }

  createVaccination(model:Vaccination): Observable<any>{
    return this.http.post(this.apiServerUrl+"/add-vaccination",model);
  }
  //delete vaccination
  removeVaccination(id:number): Observable<any>{
    return this.http.delete(this.apiServerUrl+"/delete-vaccination/"+id);
  }

  getVaccinationById(id:any){
    return this.http.get<Vaccination>(this.apiServerUrl+"/search-vaccination/"+id);
  }

  updateVaccination(model:Vaccination,id:number): Observable<any>{
    return this.http.put(this.apiServerUrl+"/update-vaccination/"+id,model);
  }
  checkIfvaccExists(vaccineLabel: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/exists-vaccination?vaccineLabel=${vaccineLabel}`);
  }
  

  


}
