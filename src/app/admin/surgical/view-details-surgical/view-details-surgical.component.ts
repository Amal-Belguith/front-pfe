import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Surgical } from '../allsurgical/surgical.model';
import { MatDialog } from '@angular/material/dialog';
import { EditSurgicalComponent } from './dialogs/edit-surgical/edit-surgical.component';
import { SurgicalService } from '../allsurgical/surgical.service';

@Component({
  selector: 'app-view-details-surgical',
  templateUrl: './view-details-surgical.component.html',
  styleUrls: ['./view-details-surgical.component.scss']
})
export class ViewDetailsSurgicalComponent implements OnInit {
  public surgical: Surgical | undefined;
  public isLoading = true;
  isInputDisabled: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private surService: SurgicalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.getSurgicalDetails();
  }

  getSurgicalDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.surService.getSurgicalById(Number(id)).subscribe(
        (surgical: Surgical) => {
          this.surgical = surgical;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching surgical details:', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  openUpdateModal(): void {
    const dialogRef = this.dialog.open(EditSurgicalComponent, {
      width: '600px',
      height: '300px',
      data: { surgical: this.surgical } // Pass allergy data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after modal is closed, such as refreshing allergy details
      this.getSurgicalDetails();
      this.isLoading = true;
    });
  }
}

  