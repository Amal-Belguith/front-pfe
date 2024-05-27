import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { AdverseEffectListComponent } from './adverse-effect-list/adverse-effect-list.component';
import { AdverseEffectDetailsComponent } from './adverse-effect-details/adverse-effect-details.component';
import { UploadFileadveffComponent } from './adverse-effect-list/upload-file-adverse-effect/upload-file-adverse-effect.component';

const routes: Routes = [
  {
    path: 'vaccination-list',
    component: VaccinationListComponent,
  },
  {
    path: 'details/:id',
    component: VaccinationDetailsComponent 
  },
  {
    path: 'adverseEffect-details/:id',
    component: AdverseEffectDetailsComponent 
  },
  {
    path: 'adverseEffect-list',
    component: AdverseEffectListComponent,
  },
  {
    path: "upload-adverse-effect",
    component: UploadFileadveffComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinationRoutingModule { }
