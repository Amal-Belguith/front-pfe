import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from './historyModel';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8093/careplan';
  constructor(private http:HttpClient) { }


  addHistory(model: History): Observable<History>{
    return this.http.post<History>(this.apiServerUrl+"/add-history",model);
  }
  historyExistsForUser(userKy: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/check-history/${userKy}`);
  }

  getAllHis(): Observable<History[]> {
    return this.http.get<History[]>(this.apiServerUrl+"/all-history");
  }

  getHistoryByUserky(userKy: number): Observable<History> {
    return this.http.get<History>(`${this.apiServerUrl}/user-history/${userKy}`);
  }

 
  
}