import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public role:any = localStorage.getItem("role"); 
  public reviews?: any[] = [];
  public host: string = 'http://localhost:5000';


  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }

  getReviews(){
    this.apiService.getReviewsPerUser().subscribe(res => {
      this.reviews = res;
      console.log('Review', this.reviews);
    }, error => {
      console.log('Ocurrio un error', error);
    });
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
}
