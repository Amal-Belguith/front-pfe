import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from './historyModel';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8090';
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

  addHistory(model: History): Observable<any>{
    return this.http.post(this.apiServerUrl+"/history/add",model);
  }
  historyExistsForUser(userKy: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/history/check/${userKy}`);
  }

  getAllHis(): Observable<History[]> {
    return this.http.get<History[]>(this.apiServerUrl+"/history/all");
  }

  getHistoryByUserky(userKy: number): Observable<History> {
    return this.http.get<History>(`${this.apiServerUrl}/history/user/${userKy}`);
  }

 
  
}