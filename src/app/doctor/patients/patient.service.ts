import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'app/authentication/user.Model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root' 
  })
export class PatientsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:8091/api/v1/auth';
  isTblLoading = true;

  constructor(private httpClient: HttpClient) {
    super();
  }
  
  
  getAllPatient(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL+'/all-user');
  }
}
