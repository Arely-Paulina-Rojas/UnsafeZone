import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public score?: number;
  public review?: string;
  public image?: string;
  public role:any = localStorage.getItem("role");
  public placeId?:any;
  public userId?:string;
  public files: any = [];
  public api:string = 'http://localhost:5000';
  
  constructor(private router: Router, private activeRoute: ActivatedRoute,private apiService: ApiService,  private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUser();
    this.placeId = this.activeRoute.snapshot.paramMap.get("placeId");
  }

  uploadFile() {
    console.log('Hola');
    let input:any = document.getElementById('customFile1');
    this.files.push(input.files[0]);
    console.log('Hola', this.files);
  };

  create(){
    let obj = {
      user: this.userId,
      place: this.placeId,
      score: this.score,
      review: this.review,
      image: this.image
    };
    console.log(obj);
    this.apiService.addReview(obj).subscribe(res => {
      this.router.navigateByUrl('/place/view/'+this.placeId+'');
      console.log('Respuesta', res);
      this.addPicture(res._id);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    } );
  } 

  addPicture(reviewId:any){
    console.log('Id del lugar', reviewId);
    const formData = new FormData();
    formData.append('reviewId', reviewId);
    formData.append('picture', this.files[0]);

    let token = localStorage.getItem("validToken");
    this.httpClient.post<any>(`${this.api}/api/reviews/addPicture?token=${token}`, formData).subscribe(res => {
      this.router.navigateByUrl('/place/view/'+this.placeId+'');
    }, err => {
      console.log('error', err);
    });
  };

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }

  getUser(){
    
    this.apiService.dataProfile().subscribe( res=> {
      this.userId = res._id;
      console.log('',this.userId);
    }, error => {
      console.log('Ocurrio un error', error);
    });
  };

}
