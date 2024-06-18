import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhysicalTreatment } from '../model/physical-treatment';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhyTreatmentService {
    isTblLoading= true;
  private apiServerUrl = 'http://localhost:8093/parameterization';

  constructor(private http: HttpClient) { }

  getAllTreatments(): Observable<PhysicalTreatment[]> {
    return this.http.get<PhysicalTreatment[]>(`${this.apiServerUrl}/all-phytreatment`);
  }

  getTreatmentById(id: number): Observable<PhysicalTreatment> {
    return this.http.get<PhysicalTreatment>(`${this.apiServerUrl}/view-phytreatment/${id}`);
  }

  saveTreatment(treatment: PhysicalTreatment): Observable<PhysicalTreatment> {
    return this.http.post<PhysicalTreatment>(`${this.apiServerUrl}/add-phytreatment`, treatment);
  }

  updateTreatment(id: number, treatment: PhysicalTreatment): Observable<PhysicalTreatment> {
    return this.http.put<PhysicalTreatment>(`${this.apiServerUrl}/update-phytreatment/${id}`, treatment);
  }
  

  deleteTreatment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete-phytreatment/${id}`);
  }

  searchPhyTreatmentByCriteria(criteria: string): Observable<PhysicalTreatment[]> {
    return this.http.get<PhysicalTreatment[]>(`${this.apiServerUrl}/search-phytreatment?criteria=${criteria}`);
  }

  checkIfTrExists(phyTrName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/exists-phytreatment?phyTrName=${phyTrName}`);
  }
}
