import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PhysicalTreatmentCategory } from '../model/physical-treatment.category';


@Injectable({
  providedIn: 'root'
})
export class PhyTrCategoryService {
  isTblLoading= true;
  private apiServerUrl =  'http://localhost:8093/parameterization';

  constructor(private http: HttpClient) { }

  getAllPhyTrCategories(): Observable<PhysicalTreatmentCategory[]> {
    return this.http.get<PhysicalTreatmentCategory[]>(`${this.apiServerUrl}/all-phycategories`);
  }

  getPhyTrCategoryById(id: number): Observable<PhysicalTreatmentCategory> {
    return this.http.get<PhysicalTreatmentCategory>(`${this.apiServerUrl}/view-phycategories/${id}`);
  }

  addPhyTrCategory(category: PhysicalTreatmentCategory): Observable<PhysicalTreatmentCategory> {
    return this.http.post<PhysicalTreatmentCategory>(`${this.apiServerUrl}/add-phycategories`, category);
  }

  updatePhyTrCategory(category: PhysicalTreatmentCategory): Observable<PhysicalTreatmentCategory> {
    return this.http.put<PhysicalTreatmentCategory>(`${this.apiServerUrl}/update-phycategories/${category.categoryid}`, category);
  }

  deletePhyTrCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete-phycategories/${id}`);
  }

  retrievePhyTrCategoryByCriteria(criteria: string): Observable<PhysicalTreatmentCategory[]> {
    return this.http.get<PhysicalTreatmentCategory[]>(`${this.apiServerUrl}/search-phycategories?criteria=${criteria}`);
  }

  checkIfTrCatExists(phyCategoryName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/exists-phycategories?phyCategoryName=${phyCategoryName}`);
  }
  addTrCatFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/upload-data-phycategories`, formData);
  }
}
