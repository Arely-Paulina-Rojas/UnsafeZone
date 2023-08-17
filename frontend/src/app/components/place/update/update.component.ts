import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public street?: string;
  public number?: string;
  public suburb?: string;
  public town?: string;
  public state?: string;
  public score?: number;
  public description?: string;
  public picture?: string;
  public place?: any; 
  public placeId?: any;
  public role:any = localStorage.getItem("role");
  public files: any = [];
  public api:string = 'http://localhost:5000';

  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.placeId = this.activeRoute.snapshot.paramMap.get("placeId");
    console.log('Id del lugar', this.placeId);
    this.getPlace();
  }
  uploadFile() {
    console.log('Hola');
    let input:any = document.getElementById('customFile');
    this.files.push(input.files[0]);
    console.log('Hola', this.files);
  };
  update(){
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
    this.apiService.updatePlace(obj, this.placeId).subscribe(res => {
      this.addPicture(this.placeId);
      this.getPlace();
      this.router.navigateByUrl('/place/view/'+this.placeId+'');
      console.log('Respuesta', res);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    });
  };

  getPlace(){
    this.apiService.getPlace(this.placeId).subscribe(res=> {
      this.place = res;
      this.street = this.place.street;
      this.number = this.place.number;
      this.suburb = this.place.suburb;
      this.town = this.place.town;
      this.state = this.place.state;
      this.score = this.place.score;
      this.description = this.place.description;
      this.picture = this.place.picture;
      console.log('Lugar', this.place);
    }, error => {
      console.log('Error', error);
    });
  };

  addPicture(placeId:any){
    console.log('Id del lugar', placeId);
    const formData = new FormData();
    formData.append('placeId', placeId);
    formData.append('picture', this.files[0]);

    let token = localStorage.getItem("validToken");
    this.httpClient.post<any>(`${this.api}/api/places/addPicture?token=${token}`, formData).subscribe(res => {
      
    }, err => {
      console.log('error', err);
    });
  };

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }
}
