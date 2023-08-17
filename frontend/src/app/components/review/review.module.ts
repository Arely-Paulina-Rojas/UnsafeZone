//Librerías
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Rutas
import { ReviewRoutingModule } from './review-routing.module';
import { ApiService } from 'src/app/services/api.service';

//Componentes
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService]
})
export class ReviewModule { }
