import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monitoring } from './monitoring.model';

@Injectable({
  providedIn: 'root'
})

export class MonitoringService {
    isTblLoading = true;
    private apiServerUrl = 'http://localhost:8092';
    constructor(private http:HttpClient) { }

  
    addMonitoring(model:Monitoring): Observable<any>{
      return this.http.post(this.apiServerUrl+"/monitoring/add",model);
    }
    


  }