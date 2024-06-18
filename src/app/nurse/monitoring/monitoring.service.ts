import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monitoring } from './monitoring.model';

@Injectable({
  providedIn: 'root'
})

export class MonitoringService {
    isTblLoading = true;
    private apiServerUrl = 'http://localhost:8093/careplan';
    constructor(private http:HttpClient) { }

  
    addMonitoring(model:Monitoring): Observable<Monitoring>{
      return this.http.post<Monitoring>(this.apiServerUrl+"/add-monitoring",model);
    }
    
    getMonitoriesByUserKy(userKy: number): Observable<Monitoring[]> {
      return this.http.get<Monitoring[]>(`${this.apiServerUrl}/user-monitoring/${userKy}`);
    }

  }