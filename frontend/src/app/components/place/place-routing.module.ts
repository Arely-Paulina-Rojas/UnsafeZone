import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Componentes
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'create', component: CreateComponent},
  { path: 'update/:placeId', component: UpdateComponent},
  { path: 'view/:placeId', component: ViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule { }