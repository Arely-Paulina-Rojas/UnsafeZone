import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public fullAddress?: string;
  public places?:any[]=[];
  public role:any = localStorage.getItem("role");
  public host: string = 'http://localhost:5000';

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(){
    this.apiService.getPlaces().subscribe(res=> {
      this.places = res;
      console.log('Lugares', this.places);
    }, error => {
      console.log('Error', error);
    });
  };

  search(){
    console.log('Direccion', this.fullAddress)
    this.apiService.searchPlace(this.fullAddress).subscribe(res => {
      console.log('Diireccion', res);
      this.places = [res];
    }, error => {
      console.log('Error', error);
    });
  }

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }
}
