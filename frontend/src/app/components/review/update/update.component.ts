import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public score?: number;
  public review?: string;
  public image?: string;
  public reviewId?: any;
  public reviewO?: any;
  public placeId?: any;
  public role:any = localStorage.getItem("role");
  public files: any = [];
  public api:string = 'http://localhost:5000';

  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.reviewId = this.activeRoute.snapshot.paramMap.get("reviewId");
    console.log('Id del review', this.reviewId);
    this.getReview();
  }

  uploadFile() {
    console.log('Hola');
    let input:any = document.getElementById('customFile1');
    this.files.push(input.files[0]);
    console.log('Hola', this.files);
  };

  update(){
    let obj = {
      score: this.score,
      review: this.review,
      image: this.image
    };
    console.log(obj);
    this.apiService.updateReview(obj, this.reviewId).subscribe(res => {
      this.router.navigateByUrl('/place/view/'+this.placeId+'');
      console.log('Respuesta', res);
      this.addPicture(this.reviewId);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    });
  };

  getReview(){
    console.log('review', this.reviewId);
    this.apiService.getReview(this.reviewId).subscribe(res=> {
      this.reviewO = res;
      this.score = this.reviewO.score;
      this.review = this.reviewO.review;
      this.image = this.reviewO.image;
      this.placeId = this.reviewO.place._id;
      console.log('review', this.reviewO);
      console.log(this.placeId);
    }, error => {
      console.log('Error', error);
    });
  };

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

}
