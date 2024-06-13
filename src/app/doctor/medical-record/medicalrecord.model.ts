import { History } from "app/patient/CareFile/historyModel";
import { Consultation } from "../consultation/Consultation.model";


export interface MedicalRecord {
    record_ky: any;
    History: History;
    Consultations:Consultation[];
    user_ky: number;

  }


  
  