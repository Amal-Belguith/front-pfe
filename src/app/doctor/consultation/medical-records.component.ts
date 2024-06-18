import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsultationService } from './consultation.service';
import { Consultation } from './Consultation.model';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { Vaccination } from 'app/admin/vaccination/model/vaccination';
import { BioAnalysis } from 'app/admin/bioanalysis/model/bioanalysis';
import { MedicationService } from 'app/admin/medication/allstaff/medication.service';
import { BioanalysisService } from 'app/admin/bioanalysis/service/bioanalysis.service';
import { VaccinationService } from 'app/admin/vaccination/services/vaccination.service';
import { Surgical } from 'app/admin/surgical/allsurgical/surgical.model';
import { SurgicalService } from 'app/admin/surgical/allsurgical/surgical.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss'],
})
export class ConsultationComponent implements OnInit {
  userKy: number = 0;
  consultationForm: FormGroup;
  medicationOptions: MedicationResponse[] = [];
  vaccinationOptions: Vaccination[] = [];
  analysisOptions: BioAnalysis[] = [];
  surgicalProcedureOptions: Surgical[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private medicationService: MedicationService,
    private analysisService: BioanalysisService,
    private vaccinationService: VaccinationService,
    private surgicalservice: SurgicalService,
    private snackBar: MatSnackBar
  ) {
    this.consultationForm = this.fb.group({
      doctorName: ['',Validators.required],
      descCon: ['',Validators.required],
      medications: [[]],
      vaccinations: [[]],
      analyses: [[]],
      descPre: [''],
      surgicalProcedures: [[]],
      descSur: [''],
      comment: ['']
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

  fetchMedications() {
    this.medicationService.getAllMedications().subscribe(res => {
      this.medicationOptions = res;
    });
  }

  fetchVaccinations() {
    this.vaccinationService.getVaccination().subscribe(res => {
      this.vaccinationOptions = res;
    });
  }

  fetchAnalyses() {
    this.analysisService.getAllBioanalysis().subscribe(res => {
      this.analysisOptions = res;
    });
  }

  fetchSurgicalProcedures() {
    this.surgicalservice.getAllSurgicals().subscribe(res => {
      this.surgicalProcedureOptions = res;
    });
  }

  onSubmit(): void {
      const formValues = this.consultationForm.value;

      const consultation: Consultation = {
        con_ky: null,
        doctorName: formValues.doctorName,
        descCon: formValues.descCon,
        medicationIds: formValues.medications.map((med: MedicationResponse) => med.medicationKy ),
        vaccinationIds: formValues.vaccinations.map((vac: Vaccination) =>  vac.idVaccination ),
        analysesIds: formValues.analyses.map((ana: BioAnalysis) =>  ana.id ),
        descPre: formValues.descPre,
        surgicalIds: formValues.surgicalProcedures.map((proc: Surgical) => proc.cptky ),
        descSur: formValues.descSur,
        comment: formValues.comment,
        userKy: this.userKy
        
      };

      console.log(consultation);

      this.consultationService.addConsultation(consultation).subscribe(response => {
        console.log('Consultation saved successfully', response);
        this.showNotification('snackbar-success', 'Consultation added successfully ', 'top', 'center');
        this.consultationForm.reset();
      }, error => {
        alert('Error saving consultation')
        this.showNotification('snackbar-error', 'Error adding consultation', 'top', 'center');
        this.consultationForm.reset();
      });
    }

    onCancel(): void {
      this.consultationForm.reset();
    }

    showNotification(
      colorName: string,
      text: string,
      placementFrom: MatSnackBarVerticalPosition,
      placementAlign: MatSnackBarHorizontalPosition
    ) {
      this.snackBar.open(text, '', {
        duration: 4000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }
}
