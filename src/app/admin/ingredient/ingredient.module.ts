import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientRoutingModule } from './ingredient-routing.module';
import { AllIngredientComponent } from './allingredient/allingredient.component';
import { DeleteIngredientComponent } from './allingredient/dialog/delete/delete.component';
import { AddIngredientComponent } from './allingredient/dialog/add-ingredient/add-ingredient.component';
import { IngredientService } from './allingredient/ingredient.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { UploadFileIngredientComponent } from './upload-file-ingredient/upload-file-ingredient.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewDetailsIngredientComponent } from './view-details-ingredient/view-details-ingredient.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditIngredientComponent } from './view-details-ingredient/dialogs/edit-ingredient/edit-ingredient.component';

@NgModule({
  declarations: [
    AllIngredientComponent,
    DeleteIngredientComponent,
    AddIngredientComponent,
    UploadFileIngredientComponent,
    ViewDetailsIngredientComponent,
    EditIngredientComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    IngredientRoutingModule,
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
  providers: [IngredientService],
})
export class IngredientModule {}
