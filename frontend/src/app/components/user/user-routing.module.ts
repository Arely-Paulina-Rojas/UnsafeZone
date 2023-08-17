import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { ProfileComponent } from './profile/profile.component';
import {CreateComponent} from './create/create.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'view', component: ViewComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'create', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }