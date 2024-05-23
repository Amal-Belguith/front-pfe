import { Component,OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { History } from '../historyModel';
import { HistoryService } from '../historyservice';
@Component({
  selector: 'app-history',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.scss'],
})
export class HistoryComponent implements OnInit {
  
  minDate: Date;
  historyForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  isDisabled = true;
  constructor(private fb: UntypedFormBuilder, private appservice:HistoryService) {
    this.historyForm = this.fb.group({
      asthma: ['', [Validators.required]],
      cancer: [''],
      heartDiseases: ['', [Validators.required]],
      diabetes: ['', [Validators.required]],
      hepatitis: [''],
      tuberculosis: ['',[Validators.required]],
      medic: ['', [Validators.required]],
      alcohol: ['', [Validators.required]],
      illegalDrugs: ['', [Validators.required]],
      gastrointestinal: ['', [Validators.required]],
      majorSurgery: ['', [Validators.required]],
      thyroidProblems: ['', [Validators.required]],
      infectiousDiseases: ['', [Validators.required]],
      tobacco: ['', [Validators.required]],
      allergies: ['', [Validators.required]],
      allergiesDetails: ['', [Validators.required]],
      majorSurgeryDetails: ['', [Validators.required]],
      medicDetails: ['', [Validators.required]],


      
    });

    this.minDate = new Date(); // Définir la date minimale comme la date actuelle
  
  }

  ngOnInit(): void {
  }
  onSubmit() {
   
    const formData = this.historyForm.value;
    const newApp: History = {

      Q1: formData.Q1,
      Q2: formData.Q2,
      Q3: formData.Q3,
      Q4: formData.Q4,
      Q5: formData.Q5,
      Q6: formData.Q6,
      Q7: formData.Q7,
    };
    
   /* this.appservice.addApp(newApp);
    console.log('Appointment added successfully', newApp)
    alert('Appointment added successfully');
    this.bookingForm.reset();

  }
    get f() {
    return this.bookingForm.controls;
    }
    Cancel() {
    this.bookingForm.reset(); 
    }*/

}
}
