import { Allergy } from "app/admin/allergy/model/allergy";

export interface Monitoring {
  mon_ky: number | null;
  genInf: string;
  allergyIds: number[];
  height: string;
  weight: string;
  length_w: string;
  width_w: string;
  depth_w: string;
  length_s: string;
  width_s: string;
  depth_s: string;
  temperature: string;
  respiratory: string;
  heart: string;
  systolic: string;
  diastolic: string;
  gly: string;
  comment: string;
  userKy: number;
}
