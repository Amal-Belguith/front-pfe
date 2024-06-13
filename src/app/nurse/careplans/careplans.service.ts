import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarePlan } from 'app/doctor/careplan/careplan.model';

@Injectable({
  providedIn: 'root'
})
export class CarePlanService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8092';
  constructor(private http:HttpClient) { }

  /*// Vaccination List
  getVaccination(): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(this.apiServerUrl+"/vaccination/all");
  }
  //delete vaccination
  removeVaccination(id:number): Observable<any>{
    return this.http.delete(this.apiServerUrl+"/vaccination/delete/"+id);
  }

  getVaccinationById(id:any){
    return this.http.get<Vaccination>(this.apiServerUrl+"/vaccination/search/"+id);
  }

  updateVaccination(model:Vaccination,id:number): Observable<any>{
    return this.http.put(this.apiServerUrl+"/vaccination/update/"+id,model);
  }*/

 
  getCarePlans(): Observable<CarePlan[]> {
    return this.http.get<CarePlan[]>(this.apiServerUrl+"/careplan/all");
  }
  deleteCare(care_ky: number): Observable<void> {
    console.log('Attemping to remove care plan with ID:',care_ky);
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${care_ky}`);
  }
}