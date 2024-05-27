import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditStaffComponent } from './dialogs/edit-staff/edit-staff.component';
import { Personal } from '../personal.model';
import { PersonalService } from '../allpersonals/personals.service';

@Component({
  selector: 'app-view-details-staff',
  templateUrl: './view-details-staff.component.html',
  styleUrls: ['./view-details-staff.component.scss']
})
export class ViewDetailsStaffComponent implements OnInit {
  public staff: Personal | undefined;
  public isLoading = true;
  isInputDisabled: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.getStaffDetails();
  }

  getStaffDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personalService.getStaffById(Number(id)).subscribe(
        (staff: Personal) => {
          this.staff = staff;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching staff details:', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  openUpdateModal(): void {
    const dialogRef = this.dialog.open(EditStaffComponent, {
      width: '600px',
      height: '600px',
      data: { staff: this.staff } // Pass allergy data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after modal is closed, such as refreshing allergy details
      this.getStaffDetails();
      this.isLoading = true;
    });
  }
}

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const allergyId = +params['id'];
      console.log('Allergy ID:', allergyId);

      this.allergyService.getAllergyById(allergyId).subscribe(
        (data: Allergy) => {
          this.allergy = data;
          console.log('Allergy details:', this.allergy);
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching allergy details:', error);
          this.isLoading = false;
        }
      );
    });
  }
  getSymptomNames(symptoms: any[]): string {
    if (!symptoms) {
      return '';
    }
    return symptoms.map(symptom => symptom.symptomName).join(', ');
  }
  openEditModal(allergy: Allergy): void {
    console.log('Editing allergy:', allergy);
    // Vous devrez peut-être ajuster cette partie en fonction de la manière dont vous récupérez les symptômes
    this.symptomService.getAllSymptoms().subscribe(symptoms => {
      const dialogRef = this.dialog.open(EditAllergyComponent, {
        width: '600px',
        data: {
          allergy: allergy,
          symptoms: symptoms // Passer les symptômes récupérés au composant de modification
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The edit dialog was closed');
        // Traiter les données retournées par le modal si nécessaire
      });
    });
  }
  
  
}*/
