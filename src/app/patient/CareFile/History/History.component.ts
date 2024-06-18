import { Component,OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { History } from '../historyModel';
import { HistoryService } from '../historyservice';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-history',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.scss'],
})
export class HistoryComponent implements OnInit {

  historyForm: UntypedFormGroup;
  userKy!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private hisservice: HistoryService,
    private snackBar: MatSnackBar
  ) {
    this.historyForm = this.fb.group({
      q1: ['', [Validators.required]],
      q2: [''],
      q3: ['', [Validators.required]],
      q4: ['', [Validators.required]],
      q5: [''],
      q6: ['', [Validators.required]],
      q7: ['', [Validators.required]],
      med_details: [''],
      q8: ['', [Validators.required]],
      q9: ['', [Validators.required]],
      q10: ['', [Validators.required]],
      q11: ['', [Validators.required]],
      all_details: [''],
      q12: ['', [Validators.required]],
      sur_details: [''],
      q13: ['', [Validators.required]],
      q14: ['', [Validators.required]],
      q15: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userKy = currentUser.user_ky;
    console.log('le userKy est:',this.userKy)
  }

  onSubmit(): void {
    if (this.historyForm.valid) {
      this.hisservice.historyExistsForUser(this.userKy).subscribe(
        exists => {
          if (exists) {
            this.showNotification('snackbar-error', 'You cannot add a new history. You already have one.', 'top', 'center');
          } else {
            this.addHistory();
          }
        },
        error => {
          console.error('Error checking history existence:', error);
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'top', 'center');
  }}

  addHistory(): void {
    const formData = this.historyForm.value;
    const newHis: History = {
      his_ky: null,
      q1: formData.q1,
      q2: formData.q2,
      q3: formData.q3,
      q4: formData.q4,
      q5: formData.q5,
      q6: formData.q6,
      q7: formData.q7,
      med_details: formData.med_details,
      q8: formData.q8,
      q9: formData.q9,
      q10: formData.q10,
      q11: formData.q11,
      all_details: formData.all_details,
      q12: formData.q12,
      sur_details: formData.sur_details,
      q13: formData.q13,
      q14: formData.q14,
      q15: formData.q15,
      userKy: this.userKy
    };
    
    this.hisservice.addHistory(newHis).subscribe(
      (response) => {
        console.log('response:', response);
        this.showNotification('snackbar-success', 'History added successfully', 'top', 'center');
        this.historyForm.reset();
      },
      error => {
        console.error('Error adding history:', error);
        this.showNotification('snackbar-error', 'Failed to add history', 'top', 'center');
      }
    );
  }


  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ): void {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onCancel(): void {
    this.historyForm.reset();
  }
}

