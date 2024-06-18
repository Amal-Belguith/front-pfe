import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CarePlanService } from './careplan.service';
import { ActivatedRoute } from '@angular/router';
import { CarePlan } from './careplan.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-careplan',
  templateUrl: './careplan.component.html',
  styleUrls: ['./careplan.component.scss'],
})
export class CarePlanComponent implements OnInit {
  carePlanForm: FormGroup;
  userKy: number = 0;

  constructor(
    private fb: FormBuilder,
    private careService: CarePlanService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.carePlanForm = this.fb.group({
      phyAss: ['', Validators.required],
      psyAss: ['', Validators.required],
      painAss: ['', Validators.required],
      vital: ['', Validators.required],
      obq1: ['', Validators.required],
      nurCare: ['', Validators.required],
      medAdd: ['', Validators.required],
      medProc: ['', Validators.required],
      techCare: ['', Validators.required],
      obq2: ['', Validators.required],
      specGol: ['', Validators.required],
      shortGol: ['', Validators.required],
      longGol: ['', Validators.required],
      obq3: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userKyParam = params.get('user_ky');
      this.userKy = userKyParam ? +userKyParam : 0;
    });
  }

  onSubmit() {
    if (this.carePlanForm.valid) {
      const formData = this.carePlanForm.value;
      const carePlan: CarePlan = {
        care_ky: null,
        phyAss: formData.phyAss,
        psyAss: formData.psyAss,
        painAss: formData.painAss,
        vital: formData.vital,
        obq1: formData.obq1,
        nurCare: formData.nurCare,
        medAdd: formData.medAdd,
        medProc: formData.medProc,
        techCare: formData.techCare,
        obq2: formData.obq2,
        specGol: formData.specGol,
        shortGol: formData.shortGol,
        longGol: formData.longGol,
        obq3: formData.obq3,
        userKy: this.userKy
      };

      this.careService.addCarePlan(carePlan).subscribe(
        response => {
          console.log('CarePlan saved successfully', response);
          this.showNotification('snackbar-success', 'Care Plan added successfully ', 'top', 'center');
          this.carePlanForm.reset();
        },
        error => {
          this.showNotification('snackbar-error', 'Error adding careplan ', 'top', 'center');
          console.error('Error saving CarePlan', error);
          this.carePlanForm.reset();
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'top', 'center');
    }
  }

  onCancel() {
    this.carePlanForm.reset();
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
