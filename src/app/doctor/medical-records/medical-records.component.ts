import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsultationService } from './consultation.service';
import { Consultation, SurgicalProcedure } from './Consultation.model';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { Vaccination } from 'app/admin/vaccination/model/vaccination';
import { BioAnalysis } from 'app/admin/bioanalysis/model/bioanalysis';
import { MedicationService } from 'app/admin/medication/allstaff/medication.service';
import { BioanalysisService } from 'app/admin/bioanalysis/service/bioanalysis.service';
import { VaccinationService } from 'app/admin/vaccination/services/vaccination.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss'],
})
export class MedicalRecordsComponent implements OnInit {
  userKy: number = 0;
  consultationForm: FormGroup;
  selectedmedications: MedicationResponse[] = [];
  selectedvaccination: Vaccination[] = [];
  selectedanalysis: BioAnalysis[] = [];
  selectedsurgicalProcedure: SurgicalProcedure[] = [];

  medicationNames: string[]=[];
  vaccinationNames:string[]=[];
  analysisNames:string[]=[];
  surgicalNames:string[]=[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private medicationService: MedicationService,
    private analysisService: BioanalysisService,
    private vaccinationService: VaccinationService
  ) {
    this.consultationForm = this.fb.group({
      doctorName: ['',Validators.required],
      descCon: ['',Validators.required],
      medications: ['',Validators.required],
      vaccinations: ['',Validators.required],
      analyses: ['',Validators.required],
      descPre: ['',Validators.required],
      surgicalProcedures: ['',Validators.required],
      descSur: ['',Validators.required],
      comment: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userKyParam = params.get('user_ky');
      this.userKy = userKyParam ? +userKyParam : 0;
    });

    this.fetchMedications();
    this.fetchVaccinations();
    this.fetchAnalyses();
    this.fetchSurgicalProcedures();
  }

  fetchMedications():void {
    this.medicationService.getAllMedications().subscribe((data:MedicationResponse[]) => {
      this.medicationNames = data.map(med=>med.medicationName);
    });
  }

  

  fetchVaccinations() {
    this.vaccinationService.getVaccination().subscribe((data:Vaccination[]) => {
      this.vaccinationNames = data.map(vacc=>vacc.vaccineLabel);
    });
  }

  fetchAnalyses() {
    this.analysisService.getAllBioanalysis().subscribe((data:BioAnalysis[]) => {
      this.analysisNames = data.map(bio=>bio.biologicalAnalysisName);
    });
  }

  fetchSurgicalProcedures() {
    this.consultationService.getAllSurgical().subscribe((data:SurgicalProcedure[]) => {
      this.surgicalNames = data.map(sur=>sur.cptCode);
    });
  }

  onSelectMedications(selectedmedications: string[]): void {
    selectedmedications.forEach(medicationName => {
      const normalizedmedicationName = medicationName.toLowerCase();
      
      // Check if the side effect is already selected
      if (!this.selectedmedications.some(med => med.medicationName.toLowerCase() === normalizedmedicationName)) {
        // If not selected, fetch the side effect and add it
        this.medicationService.getAllMedications().subscribe(
          (medications: MedicationResponse[]) => {
            const selectedMed = medications.find(med => med.medicationName.toLowerCase() === normalizedmedicationName);
            if (selectedMed) {
              this.selectedmedications.push(selectedMed);
            } else {
              console.error('Medication not found:', medicationName);
            }
          },
          (error) => {
            console.error('Error fetching Medication:', error);
          }
        );
      }
    });
  }
  onSelectVaccinations(selectedvaccination: string[]): void {
    selectedvaccination.forEach(vaccineLabel => {
      const normalizedvaccineLabel = vaccineLabel.toLowerCase();
      
      // Check if the side effect is already selected
      if (!this.selectedvaccination.some(med => med.vaccineLabel.toLowerCase() === normalizedvaccineLabel)) {
        // If not selected, fetch the side effect and add it
        this.vaccinationService.getVaccination().subscribe(
          (vaccinations: Vaccination[]) => {
            const selectedVacc = vaccinations.find(vacc => vacc.vaccineLabel.toLowerCase() === normalizedvaccineLabel);
            if (selectedVacc) {
              this.selectedvaccination.push(selectedVacc);
            } else {
              console.error('Vaccination not found:', vaccineLabel);
            }
          },
          (error) => {
            console.error('Error fetching Vaccination:', error);
          }
        );
      }
    });
  }

  onSelectAnalyses(selectedanalysis: string[]): void {
    selectedanalysis.forEach(biologicalAnalysisName => {
      const normalizedbiologicalAnalysisName = biologicalAnalysisName.toLowerCase();
      
      // Check if the side effect is already selected
      if (!this.selectedanalysis.some(anal => anal.biologicalAnalysisName.toLowerCase() === normalizedbiologicalAnalysisName)) {
        // If not selected, fetch the side effect and add it
        this.analysisService.getAllBioanalysis().subscribe(
          (analysis: BioAnalysis[]) => {
            const selectedbio = analysis.find(anal => anal.biologicalAnalysisName.toLowerCase() === normalizedbiologicalAnalysisName);
            if (selectedbio) {
              this.selectedanalysis.push(selectedbio);
            } else {
              console.error('Analysis not found:', biologicalAnalysisName);
            }
          },
          (error) => {
            console.error('Error fetching Analysis:', error);
          }
        );
      }
    });
  }

  onSelectSurgical(selectedsurgicalProcedure: string[]): void {
    selectedsurgicalProcedure.forEach(cptCode => {
      const normalizedcptCode = cptCode.toLowerCase();
      
      // Check if the side effect is already selected
      if (!this.selectedsurgicalProcedure.some(cpt => cpt.cptCode.toLowerCase() === normalizedcptCode)) {
        // If not selected, fetch the side effect and add it
        this.consultationService.getAllSurgical().subscribe(
          (surgical: SurgicalProcedure[]) => {
            const selectedSurg = surgical.find(cpt => cpt.cptCode.toLowerCase() === normalizedcptCode);
            if (selectedSurg) {
              this.selectedsurgicalProcedure.push(selectedSurg);
            } else {
              console.error('CPT not found:', cptCode);
            }
          },
          (error) => {
            console.error('Error fetching CPT:', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if(this.consultationForm.valid){

      const formValues = this.consultationForm.value;

      const consultation: Consultation = {
        con_ky: null,
        doctorName: formValues.doctorName,
        descCon: formValues.descCon,
        medications: this.selectedmedications,
        vaccinations: this.selectedvaccination,
        analyses: this.selectedanalysis,
        descPre: formValues.descPre,
        surgicalProcedures: this.selectedsurgicalProcedure,
        descSur: formValues.descSur,
        comment: formValues.comment,
        user_ky: this.userKy
        
      };

      console.log(consultation);

      this.consultationService.addConsultation(consultation).subscribe(response => {
        console.log('Consultation saved successfully', response);
        alert('Consultation added successfully');
      }, error => {
        alert('Error saving consultation')
        console.error('Error saving consultation', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
    onCancel(): void {
      this.consultationForm.reset();
    }

}