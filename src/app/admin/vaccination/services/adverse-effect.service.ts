import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AdverseEffect } from '../model/vaccination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdverseEffectService {
  
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8093/parameterization';
  constructor(private http:HttpClient) { }
    // SideEffects List
    getSideEffects(): Observable<AdverseEffect[]> {
      return this.http.get<AdverseEffect[]>(this.apiServerUrl+"/all-adverseEffect");
    }
  
    //delete SideEffects
    removeSideEffects(id:any): Observable<any>{
      return this.http.delete(this.apiServerUrl+"/delete-adverseEffect/"+id);
    }
  // SideEffects List
  createSideEffects(model:AdverseEffect): Observable<any>{
    return this.http.post(this.apiServerUrl+"/add-adverseEffect",model);
  }

  getSideEffectsById(id:any){
    return this.http.get<AdverseEffect>(this.apiServerUrl+"/search-adverseEffect/"+id);
  }

  updateSideEffects(model:AdverseEffect,id:number): Observable<any>{
    return this.http.put(this.apiServerUrl+"/update-adverseEffect/"+id,model);
  }

  checkIfadveffExists(adverseEffectName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/exists-adverseEffect?adverseEffectName=${adverseEffectName}`);
  }
  addadveffFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/upload-data-adverseEffect`, formData);
  }

}
