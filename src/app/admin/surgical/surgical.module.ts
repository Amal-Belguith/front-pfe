import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurgicalRoutingModule } from './surgical-routing.module';
import { AllSurgicalComponent } from './allsurgical/allsurgical.component';
import { DeleteSurgicalComponent } from './allsurgical/dialog/delete/delete.component';
import { AddSurgicalComponent } from './allsurgical/dialog/add-surgical/add-surgical.component';
import { SurgicalService } from './allsurgical/surgical.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewDetailsSurgicalComponent } from './view-details-surgical/view-details-surgical.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditSurgicalComponent } from './view-details-surgical/dialogs/edit-surgical/edit-surgical.component';

@NgModule({
  declarations: [
    AllSurgicalComponent,
    DeleteSurgicalComponent,
    AddSurgicalComponent,
    ViewDetailsSurgicalComponent,
    EditSurgicalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    SurgicalRoutingModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    NgScrollbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [SurgicalService],
})
export class SurgicalModule {}
