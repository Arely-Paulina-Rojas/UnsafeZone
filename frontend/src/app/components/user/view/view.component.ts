import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public users?:any[]=[];
  public role:any = localStorage.getItem("role");

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsers().subscribe(res=> {
      this.users = res;
      console.log('Usuarios', this.users);
    }, error => {
      console.log('Error', error);
    });
  };

  deleteUser(userId: any){
    if(confirm("¿Estas seguro que deseas eliminar este usuario?")){
      this.apiService.deleteUser(userId).subscribe(res=> {
        this.router.navigateByUrl('/user/view');
        this.getUsers();
        console.log('Respuesta', res);
      }, error => {
        console.log('Error', error);
        alert(error.error.message);
      });
    }
  };

  logout(){
    localStorage.removeItem("validToken");
    this.router.navigateByUrl('/user/login');
  }
}
