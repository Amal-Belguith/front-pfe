import { BioAnalysis } from "app/admin/bioanalysis/model/bioanalysis";
import { MedicationResponse } from "app/admin/medication/MedicationResponse";
import { Surgical } from "app/admin/surgical/allsurgical/surgical.model";
import { Vaccination } from "app/admin/vaccination/model/vaccination";

export interface Consultation {
  con_ky: any;
  doctorName: string;
  descCon: string;
  descSur: string;
  descPre: string;
  comment: string;
  userKy: number;
  medicationIds: number[];
  vaccinationIds: number[];
  analysesIds: number[];
  surgicalIds: number[];
}


  
  