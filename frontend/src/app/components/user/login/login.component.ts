import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email?: string;
  public password?: string;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  login(){
    let obj = {
      email: this.email,
      password: this.password
    };
    this.apiService.login(obj).subscribe(res => {
      this.router.navigateByUrl('/place/main');
      console.log('Respuesta', res);
    }, error => {
      console.log('Error', error);
      alert(error.error.message);
    });
  };

}
