import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private readonly API_URL = 'http://localhost:8093/parameterization';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Ingredient;
  constructor(private httpClient: HttpClient) {}

  
  /** CRUD METHODS */
  getAllIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.API_URL+"/all-ingredient");
  }
  
  checkIfIngredientExists(ingredientName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/exists-ingredient?ingredientName=${ingredientName}`);
  }

  addIngredientFile(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/upload-data-ingredient`, formData);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
     return this.httpClient.post<Ingredient>(this.API_URL + '/add-ingredient', ingredient);
    
  }

  updateIngredient(ingredientKy: any, updatedIngredient: Ingredient): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/edit-ingredient/${ingredientKy}`, updatedIngredient);
  }
  deleteIngredient(ingredientKy: number): Observable<void> {
    console.log('Attemping to remove ingredient with ID:',ingredientKy);
    return this.httpClient.delete<void>(`${this.API_URL}/delete-ingredient/${ingredientKy}`);
  }
  searchIngredient(ingredientName: string): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(`${this.API_URL}/search/${ingredientName}`);
  }

  getIngredientById(ingredientKy:any){
    return this.httpClient.get<Ingredient>(`${this.API_URL}/details-ingredient/${ingredientKy}`);
  }
  createMedication(model:Ingredient): Observable<any>{
    return this.httpClient.post(this.API_URL + '/add-ingredient', model);
  }
  
}
