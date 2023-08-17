//librerias
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Rutas
import { UserRoutingModule } from './user-routing.module';
import { ApiService } from 'src/app/services/api.service';

//Componentes
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ViewComponent,
    ProfileComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService]
})
export class UserModule { }
