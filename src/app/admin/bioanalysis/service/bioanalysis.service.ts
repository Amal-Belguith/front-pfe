import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { BioAnalysis } from "../model/bioanalysis";
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class BioanalysisService {
  private apiServerUrl = 'http://localhost:8093/parameterization';
  isTblLoading = true;

  constructor(private http: HttpClient){}

    // Méthode pour récupérer toutes les allergies
   // public getAllBioanalysis(): Observable<BioAnalysis[]> {
     // return this.http.get<BioAnalysis[]>(${this.apiServerUrl}/bioanalyses/all);
    //}

    getAllBioanalysis(): Observable<BioAnalysis[]> {
        return this.http.get<BioAnalysis[]>(this.apiServerUrl+"/all-bioanalyses");
     }

      public removeBioanalysis(id: any): Observable<void> {
        console.log('Attempting to remove bioanalysis with ID:', id);
        return this.http.delete<void>(this.apiServerUrl+"/delete-bioanalyses/"+id);
        
      }

      createBioAnalysis(bio:BioAnalysis): Observable<any>{
        return this.http.post(this.apiServerUrl+"/add-bioanalyses",bio);
      }

      public getAnalysisById(id: any): Observable<BioAnalysis> {
        return this.http.get<BioAnalysis>(this.apiServerUrl+"/view-bioanalyses/"+id);
      }

      //public updatebioanalysis(bioanalysis: BioAnalysis, id: number): Observable<any> {
      //  return this.http.put<BioAnalysis>(this.apiServerUrl+"/bioanalyses/update/"+id, bioanalysis);
     // }

      public updateAnalysis(id: number, updatedAnalysis: BioAnalysis): Observable<BioAnalysis> {
        return this.http.put<BioAnalysis>(this.apiServerUrl+"/update-bioanalyses/"+id, updatedAnalysis);
      }
      checkIfAnalyseExists(biologicalAnalysisName: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiServerUrl}/exists-bioanalyses?biologicalAnalysisName=${biologicalAnalysisName}`);
      }
}