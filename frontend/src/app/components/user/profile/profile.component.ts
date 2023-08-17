import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public name?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public userId?: string;
  public role:any = localStorage.getItem("role");

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    console.log('Hola');
    this.apiService.dataProfile().subscribe( res=> {
      this.name = res.name;
      this.lastName = res.lastName;
      this.email = res.email;
      this.password = res.password;
      this.userId = res._id;
    }, error => {
      console.log('Ocurrio un error', error);
    });
  };

  profile(){
    let obj = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    this.apiService.updateUser(obj, this.userId).subscribe(res=> {
      this.router.navigateByUrl('/place/main');
    }, error => {
      console.log('Ocurrio un error', error);
    });
  };

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }
}
