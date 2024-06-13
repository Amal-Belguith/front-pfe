import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './user.Model';
import { AuthenticationResponse } from './authentication.response';
import { AuthenticationRequest } from './authentication.request';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from './userdetails';
@Injectable({
  providedIn: 'root'
})
export class authenticateservice  {
  private readonly API_URL = 'http://localhost:8091/api/v1/auth';
  isTblLoading = true;
  dialogData!: User;

  constructor(private httpClient: HttpClient) {
    
  }

  /** CRUD METHODS */

   
  register(user: User) {
    return this.httpClient.post<AuthenticationResponse>(`${this.API_URL}/register`, user);
  }

  authenticate(auth: AuthenticationRequest){
    console.log(auth)
    return this.httpClient.post<AuthenticationResponse>(this.API_URL+'/login', auth);
  }   

  getUserDetails(): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(this.API_URL+'/user-details');
  }

  updateUser(user_ky: number, updatedUser: any): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/update/${user_ky}`, updatedUser);
  }

}