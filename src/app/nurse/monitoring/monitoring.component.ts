import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MonitoringService } from './monitoring.service';
import { ActivatedRoute } from '@angular/router';
import { AllergyService } from 'app/admin/allergy/services/allergy.service';
import { Allergy } from 'app/admin/allergy/model/allergy';
import { Monitoring } from './monitoring.model';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent implements OnInit {
  monitoringForm!: FormGroup;
  userKy: number = 0;
  allergyOptions: Allergy[] = [];

  constructor(
    private fb: FormBuilder,
    private monService: MonitoringService,
    private route: ActivatedRoute,
    private allServ: AllergyService
  ) {
    this.monitoringForm = this.fb.group({
      genInf: [''],
      allergies: [[]],
      height: [''],
      weight: [''],
      length_w: [''],
      width_w: [''],
      depth_w: [''],
      length_s: [''],
      width_s: [''],
      depth_s: [''],
      temperature: [''],
      respiratory: [''],
      heart: [''],
      systolic: [''],
      diastolic: [''],
      gly: [''],
      comment: [''],
      bandage: [''],
      medications: [''],
      analysis: [''],
      vaccinations: [''],
      exercises: [''],
      massage: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userKyParam = params.get('user_ky');
      this.userKy = userKyParam ? +userKyParam : 0;
    });

    this.fetchAllergies();
  }

  fetchAllergies() {
    this.allServ.getAllAllergies().subscribe(res => {
      this.allergyOptions = res;
    });
  }

  onSubmit(): void {
    const formValues = this.monitoringForm.value;

    const mont: Monitoring = {
      mon_ky: null,
      genInf: formValues.genInf,
      allergyIds: formValues.allergies.map((all: Allergy) => all.allergyKy),
      height: formValues.height,
      weight: formValues.weight,
      length_w: formValues.length_w,
      width_w: formValues.width_w,
      depth_w: formValues.depth_w,
      length_s: formValues.length_s,
      width_s: formValues.width_s,
      depth_s: formValues.depth_s,
      temperature: formValues.temperature,
      respiratory: formValues.respiratory,
      heart: formValues.heart,
      systolic: formValues.systolic,
      diastolic: formValues.diastolic,
      gly: formValues.gly,
      comment: formValues.comment,
      bandage: formValues.bandage,
      medications: formValues.medications,
      analysis: formValues.analysis,
      vaccinations: formValues.vaccinations,
      exercises: formValues.exercises,
      massage: formValues.massage,
      user_ky: this.userKy,
    };

    console.log(mont);

    this.monService.addMonitoring(mont).subscribe(response => {
      console.log('Monitoring saved successfully', response);
      alert('Monitoring added successfully');
      this.monitoringForm.reset();
    }, error => {
      alert('Error saving monitoring');
      console.error('Error saving monitoring', error);
      this.monitoringForm.reset();
    });
  }

  onCancel() {
    this.monitoringForm.reset();
  }
}





