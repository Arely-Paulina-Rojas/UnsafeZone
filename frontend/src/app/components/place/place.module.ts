//Librerías
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Rutas
import { PlaceRoutingModule } from './place-routing.module';
import { ApiService } from 'src/app/services/api.service';

//Componentes
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    PlaceRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService]
})
export class PlaceModule { }
