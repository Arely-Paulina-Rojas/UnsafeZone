import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)},
  {path: 'place', loadChildren: () => import('./components/place/place.module').then(m => m.PlaceModule)},
  {path: 'review', loadChildren: () => import('./components/review/review.module').then(m => m.ReviewModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
