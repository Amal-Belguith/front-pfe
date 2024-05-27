import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Personal } from '../personal.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenticationResponse } from 'app/authentication/authentication.response';
import { Observable } from 'rxjs';
@Injectable()
export class PersonalService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:8091/api/v1/auth';
  isTblLoading = true;

  constructor(private httpClient: HttpClient) {
    super();
  }
  
  addPersonal(personal: Personal) {
    return this.httpClient.post<AuthenticationResponse>(`${this.API_URL}/register_personal`, personal);
  }
  getAllPersonal(): Observable<Personal[]> {
    return this.httpClient.get<Personal[]>(this.API_URL+'/all-personal');
  }

  updatePersonal(user_ky: any, updatedPersonal: Personal): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/edit/${user_ky}`, updatedPersonal);
  }
  deletePersonal(user_ky: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${user_ky}`);
  }
  getStaffById(user_ky:any){
    return this.httpClient.get<Personal>(`${this.API_URL}/details/${user_ky}`);
  }

  
}
