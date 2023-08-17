import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public name?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public role?: string; 
  public rol:any = localStorage.getItem("role");

  constructor(private router: Router, private apiService: ApiService) {   }

  ngOnInit(): void {
  }

  create(){
    let obj = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: this.role
    };
    console.log(obj);
    this.apiService.createUser(obj).subscribe(res => {
      this.router.navigateByUrl('/user/view');
      console.log('Respuesta', res);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    } );
  };

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }

}
