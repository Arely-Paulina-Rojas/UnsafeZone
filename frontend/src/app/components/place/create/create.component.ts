import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public street?: string;
  public number?: number;
  public suburb?: string;
  public town?: string;
  public state?: string;
  public score?: number;
  public description?: string;
  public picture?: string;
  public role:any = localStorage.getItem("role");
  public files: any = [];
  public api:string = 'http://localhost:5000';

  constructor(private router: Router, private apiService: ApiService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  uploadFile() {
    console.log('Hola');
    let input:any = document.getElementById('customFile');
    this.files.push(input.files[0]);
    console.log('Hola', this.files);
  };

  create(){
    let obj = {
      street: this.street,
      number: this.number,
      suburb: this.suburb,
      town: this.town,
      state: this.state,
      score: this.score,
      description: this.description,
      picture: this.picture
    };
    console.log(obj);
    this.apiService.addPlace(obj).subscribe(res => {
      console.log('Respuesta', res);
      this.addPicture(res._id);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    } );
  };

  addPicture(placeId:any){
    console.log('Id del lugar', placeId);
    const formData = new FormData();
    formData.append('placeId', placeId);
    formData.append('picture', this.files[0]);

    let token = localStorage.getItem("validToken");
    this.httpClient.post<any>(`${this.api}/api/places/addPicture?token=${token}`, formData).subscribe(res => {
      this.router.navigateByUrl('/place/main');
    }, err => {
      console.log('error', err);
    });
  };
 
  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }
}
