import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarePlan } from './careplan.model';

@Injectable({
  providedIn: 'root'
})
export class CarePlanService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8093/careplan';
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

  addCarePlan(model: CarePlan): Observable<any>{
    return this.http.post(this.apiServerUrl+"/add-careplan",model);
  }
  getCareplansByUserKy(userKy: number): Observable<CarePlan[]> {
    return this.http.get<CarePlan[]>(`${this.apiServerUrl}/user-careplan/${userKy}`);
  }
  
}