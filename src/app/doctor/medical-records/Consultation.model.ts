import { BioAnalysis } from "app/admin/bioanalysis/model/bioanalysis";
import { MedicationResponse } from "app/admin/medication/MedicationResponse";
import { Vaccination } from "app/admin/vaccination/model/vaccination";

export interface Consultation {
    con_ky: any;
    doctorName: string;
    descCon: String; 
    medications: MedicationResponse[];
    vaccinations: Vaccination []; 
    analyses: BioAnalysis[];
    descPre: string;
    surgicalProcedures: SurgicalProcedure[];
    descSur: string;
    comment: string;
    user_ky: number;

  }

  export interface SurgicalProcedure {
    cptky: number;
    cptCode: string; 
    cptDesc: string;
    cptCategory:string;
 }
  
  