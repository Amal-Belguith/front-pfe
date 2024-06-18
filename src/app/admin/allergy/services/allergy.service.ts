import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Allergy } from '../model/allergy';


@Injectable({providedIn: 'root'})
export class AllergyService {
  isTblLoading= true;
  private apiServerUrl = 'http://localhost:8093/parameterization';

  constructor(private http: HttpClient){}
// Vaccination List
getVaccination(): Observable<Allergy[]> {
  return this.http.get<Allergy[]>(this.apiServerUrl+"/all-vaccination");
}
    // Méthode pour récupérer toutes les allergies
    public getAllAllergies(): Observable<Allergy[]> {
      return this.http.get<Allergy[]>(`${this.apiServerUrl}/all-allergy`);
    }

       // Méthode pour ajouter une allergie
       public addAllergy(allergy: Allergy): Observable<Allergy> {
        return this.http.post<Allergy>(`${this.apiServerUrl}/add-allergy`, allergy);
      }    

  // Méthode pour mettre à jour une allergie
  /*public updateAllergy(allergyKy: number, allergy: Allergy): Observable<Allergy> {
    return this.http.put<Allergy>(`${this.apiServerUrl}/allergies/update/${allergyKy}`, allergy);
  }*/
  updateAllergy(model:Allergy,id:number): Observable<any>{
    return this.http.put(this.apiServerUrl+"/update-allergy/"+id,model);
  }

  // Méthode pour supprimer une allergie
  public removeAllergy(allergyKy: number): Observable<void> {
    console.log('Attempting to remove allergy with ID:', allergyKy);
    return this.http.delete<void>(`${this.apiServerUrl}/remove-allergy/${allergyKy}`);
  }

  // Méthode pour rechercher des allergies par critères
  public searchAllergies(criteria: string): Observable<Allergy[]> {
    return this.http.get<Allergy[]>(`${this.apiServerUrl}/search-allergy?iCriteria=${criteria}`);
  }

  // Méthode pour récupérer les détails d'une allergie par son identifiant
 /* public getAllergyById(allergyKy: any): Observable<Allergy> {
    return this.http.get<Allergy>(`${this.apiServerUrl}/allergies/view/details/${allergyKy}`);
  }*/
  getAllergyById(id:any){
    return this.http.get<Allergy>(this.apiServerUrl+"/view-allergy/details/"+id);
  }
  createAllergy(model:Allergy): Observable<any>{
    return this.http.post(this.apiServerUrl+"/add-allergy",model);
  }
  checkIfAllergyExists(allergyName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/exists-allergy?allergyName=${allergyName}`);
  }
}