import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  register(){
    let obj = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    console.log(obj);
    this.apiService.register(obj).subscribe(res => {
      this.router.navigateByUrl('/user/login');
      console.log('Respuesta', res);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    } );
  };

}
