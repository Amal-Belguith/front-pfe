import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { History } from 'app/patient/CareFile/historyModel';
import { HistoryService } from 'app/patient/CareFile/historyservice';
import { MatTableDataSource } from '@angular/material/table';
import { Consultation } from '../consultation/Consultation.model';
import { ConsultationService } from '../consultation/consultation.service';
import { CarePlanService } from '../careplan/careplan.service';
import { CarePlan } from '../careplan/careplan.model';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { Vaccination } from 'app/admin/vaccination/model/vaccination';
import { BioAnalysis } from 'app/admin/bioanalysis/model/bioanalysis';
import { Surgical } from 'app/admin/surgical/allsurgical/surgical.model';
import { MedicationService } from 'app/admin/medication/allstaff/medication.service';
import { VaccinationService } from 'app/admin/vaccination/services/vaccination.service';
import { SurgicalService } from 'app/admin/surgical/allsurgical/surgical.service';
import { BioanalysisService } from 'app/admin/bioanalysis/service/bioanalysis.service';
import { MonitoringService } from 'app/nurse/monitoring/monitoring.service';
import { Monitoring } from 'app/nurse/monitoring/monitoring.model';
import { Allergy } from 'app/admin/allergy/model/allergy';
import { AllergyService } from 'app/admin/allergy/services/allergy.service';
@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss'],
})

export class MedicalRecordComponent implements OnInit {
  userKy: number = 0;
  histories: History[] = [];
  consultations: Consultation[] = [];
  careplans: CarePlan[] = [];
  monitories: Monitoring[] = [];
  hist: any;
  medicationOptions: MedicationResponse[] = [];
  vaccinationOptions: Vaccination[] = [];
  analysisOptions: BioAnalysis[] = [];
  surgicalProcedureOptions: Surgical[] = [];
  allergyOptions: Allergy[] = []; // Ajout de la liste des allergies

  // Loading flags
  medicationsLoaded: boolean = false;
  vaccinationsLoaded: boolean = false;
  analysesLoaded: boolean = false;
  surgicalsLoaded: boolean = false;
  allergiesLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private consultationService: ConsultationService,
    private careplanService: CarePlanService,
    private medicationService: MedicationService,
    private vaccinationService: VaccinationService,
    private analysisService: BioanalysisService,
    private surgicalService: SurgicalService,
    private monitoringService: MonitoringService,
    private allergyService: AllergyService // Ajout du service d'allergies
  ) {}

  ngOnInit(): void {
    this.userKy = Number(this.route.snapshot.paramMap.get('user_ky'));
    console.log('user_ky est:', this.userKy);

    if (this.userKy) {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.historyService.getHistoryByUserky(this.userKy).subscribe(
      (data: any) => {
        if (typeof data === 'object' && !Array.isArray(data)) {
          this.hist = [data];
        } else if (Array.isArray(data)) {
          this.hist = data;
        } else {
          console.error('Les données reçues ne sont pas valides.');
        }
        console.log('histories sont:', this.hist);
      },
      error => {
        console.error('Error fetching histories', error);
      }
    );

    this.consultationService.getConsultationsByUserKy(this.userKy).subscribe(
      (data: Consultation[]) => {
        this.consultations = data;
        console.log('consultations sont:', this.consultations);
      },
      error => {
        console.error('Error fetching consultations', error);
      }
    );

    this.careplanService.getCareplansByUserKy(this.userKy).subscribe(
      (data: CarePlan[]) => {
        this.careplans = data;
        console.log('careplans sont:', this.careplans);
      },
      error => {
        console.error('Error fetching careplans', error);
      }
    );

    this.monitoringService.getMonitoriesByUserKy(this.userKy).subscribe(
      (data: Monitoring[]) => {
        this.monitories = data;
        console.log('monitories sont:', this.monitories);
      },
      error => {
        console.error('Error fetching monitories', error);
      }
    );

    this.medicationService.getAllMedications().subscribe(
      (data: MedicationResponse[]) => {
        this.medicationOptions = data;
        this.medicationsLoaded = true;
        console.log('medicationOptions sont:', this.medicationOptions);
      },
      error => {
        console.error('Error fetching medications', error);
      }
    );

    this.vaccinationService.getVaccination().subscribe(
      (data: Vaccination[]) => {
        this.vaccinationOptions = data;
        this.vaccinationsLoaded = true;
        console.log('vaccinationOptions sont:', this.vaccinationOptions);
      },
      error => {
        console.error('Error fetching vaccinations', error);
      }
    );

    this.analysisService.getAllBioanalysis().subscribe(
      (data: BioAnalysis[]) => {
        this.analysisOptions = data;
        this.analysesLoaded = true;
        console.log('analysisOptions sont:', this.analysisOptions);
      },
      error => {
        console.error('Error fetching analyses', error);
      }
    );

    this.surgicalService.getAllSurgicals().subscribe(
      (data: Surgical[]) => {
        this.surgicalProcedureOptions = data;
        this.surgicalsLoaded = true;
        console.log('surgicalProcedureOptions sont:', this.surgicalProcedureOptions);
      },
      error => {
        console.error('Error fetching surgical procedures', error);
      }
    );

    // Charger les allergies
    this.allergyService.getAllAllergies().subscribe(
      (data: Allergy[]) => {
        this.allergyOptions = data;
        this.allergiesLoaded = true;
        console.log('allergyOptions sont:', this.allergyOptions);
      },
      error => {
        console.error('Error fetching allergies', error);
      }
    );
  }

  // Méthode de mapping pour les médicaments
  getMedicationName(medicationId: number): string {
    if (!this.medicationsLoaded) return 'Loading...';
    const medication = this.medicationOptions.find(med => med.medicationKy === medicationId);
    return medication ? medication.medicationName : 'Non trouvé';
  }

  // Méthode de mapping pour les analyses
  getAnalysisName(analysisId: number): string {
    if (!this.analysesLoaded) return 'Loading...';
    const analysis = this.analysisOptions.find(ana => ana.id === analysisId);
    return analysis ? analysis.biologicalAnalysisName : 'Non trouvé';
  }

  // Méthode de mapping pour les procédures chirurgicales
  getSurgicalName(surgicalId: number): string {
    if (!this.surgicalsLoaded) return 'Loading...';
    const surgical = this.surgicalProcedureOptions.find(proc => proc.cptky === surgicalId);
    return surgical ? surgical.cptDesc : 'Non trouvé';
  }

  // Méthode de mapping pour les vaccins
  getVaccineName(vaccineId: number): string {
    if (!this.vaccinationsLoaded) return 'Loading...';
    const vaccine = this.vaccinationOptions.find(vac => vac.idVaccination === vaccineId);
    return vaccine ? vaccine.vaccineLabel : 'Non trouvé';
  }

  // Méthode de mapping pour les allergies
  getAllergiesName(allergyId: number): string {
    if (!this.allergiesLoaded) return 'Loading...';
    const allergy = this.allergyOptions.find(all => all.allergyKy === allergyId);
    return allergy ? allergy.allergyName : 'Non trouvé';
  }
}
