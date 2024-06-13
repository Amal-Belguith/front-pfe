import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultation} from './Consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
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

  addConsultation(model:Consultation): Observable<any>{
    return this.http.post(this.apiServerUrl+"/consultation/add",model);
  }
 
  getAllConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.apiServerUrl+"/consultation/all");
  }

  getConsultationsByUserKy(userKy: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiServerUrl}/consultation/user/${userKy}`);
  }

}