import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public placeId?: any;
  public reviewId?: any;
  public place?: any;
  public reviews?: any[] = [];
  public role:any = localStorage.getItem("role");
  public host: string = 'http://localhost:5000';
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.placeId = this.activeRoute.snapshot.paramMap.get("placeId");
    console.log('Id del lugar', this.placeId);
    this.getPlace();
  }
  
  getPlace(){
    this.apiService.getPlace(this.placeId).subscribe(res=> {
      this.place = res;
      console.log('Lugar', this.place);
      this.getReviews();
    }, error => {
      console.log('Error', error);
    });
  };

  getReviews(){
    this.apiService.getReviews(this.place._id).subscribe(res => {
      this.reviews = res;
      console.log('Review', this.reviews);
    }, error => {
      console.log('Ocurrio un error', error);
    });
  };

  deletePlace(){
    if(confirm("¿Estas seguro que deseas eliminar este lugar?")){
      this.apiService.deletePlace(this.placeId).subscribe(res=> {
        this.router.navigateByUrl('/place/main');
        console.log('Respuesta', res);
      }, error => {
        console.log('Error', error);
        alert(error.error.message);
      });
    }
  };

  deleteReview(id: any){
    console.log(id);
    if(confirm("¿Estas seguro que deseas eliminar esta review?")){
      this.apiService.deleteReview(id).subscribe(res=> {
        this.getReviews();
        console.log('Respuesta', res);
      }, error => {
        console.log('Error', error);
        alert(error.error.message);
      });
    }
  };

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }

}
