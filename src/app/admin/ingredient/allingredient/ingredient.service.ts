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
  private readonly API_URL = 'http://localhost:8090/ingredient';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Ingredient;
  constructor(private httpClient: HttpClient) {}
  /*get data(): Ingredient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  
  /** CRUD METHODS */
  getAllIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.API_URL);
  }
  
  checkIfIngredientExists(ingredientName: string): Observable<boolean> {
      return this.httpClient.get<boolean>(`${this.API_URL}/exists?ingredientName=${ingredientName}`);
    }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
     return this.httpClient.post<Ingredient>(this.API_URL + '/add', ingredient);
    
  }

  addIngredientFile(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/upload-data`, formData);
  }
  
  updateIngredient(ingredientKy: any, updatedIngredient: Ingredient): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/edit/${ingredientKy}`, updatedIngredient);
  }
  deleteIngredient(ingredientKy: number): Observable<void> {
    console.log('Attemping to remove ingredient with ID:',ingredientKy);
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${ingredientKy}`);
  }
  searchIngredient(ingredientName: string): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(`${this.API_URL}/search/${ingredientName}`);
  }

  getIngredientById(ingredientKy:any){
    return this.httpClient.get<Ingredient>(`${this.API_URL}/details/${ingredientKy}`);
  }
  createMedication(model:Ingredient): Observable<any>{
    return this.httpClient.post(this.API_URL + '/add', model);
  }
  
}
