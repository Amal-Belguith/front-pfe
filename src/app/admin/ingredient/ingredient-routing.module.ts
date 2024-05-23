import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllIngredientComponent } from "./allingredient/allingredient.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { UploadFileIngredientComponent } from "./upload-file-ingredient/upload-file-ingredient.component";
import { ViewDetailsIngredientComponent } from "./view-details-ingredient/view-details-ingredient.component";
const routes: Routes = [
  {
    path: "all-ingredient",
    component: AllIngredientComponent,
  },
  {
    path: "upload-ingredient",
    component: UploadFileIngredientComponent,
  },

  {
    path: 'view/details/ingredient/:id',
    component: ViewDetailsIngredientComponent,
  },     
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientRoutingModule {}
