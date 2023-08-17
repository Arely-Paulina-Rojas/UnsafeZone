import { NgModule, ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'create/:placeId', component: CreateComponent},
  { path: 'update/:reviewId', component: UpdateComponent},
  { path: 'view', component: ViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }