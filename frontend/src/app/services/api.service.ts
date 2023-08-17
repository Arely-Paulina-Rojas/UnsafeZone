import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public api:string = 'http://localhost:5000';
  authSubject = new BehaviorSubject(false);
  private token?: string;

  constructor(private httpClient: HttpClient) { }

  login(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/api/users/login`, obj).pipe(tap(
      (res: any) => {
        if(res) {
          console.log('Respuesta', res);
          //guardar token
          this.saveToken(res.token, res.role);
        }
      }
    ))
  };

  register(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/api/users/register`, obj).pipe(tap(
      (res: any) => {
        if(res) {
        }
      }
    ))
  };

  createUser(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/api/users?token=${this.getToken()}`, obj).pipe(tap(
      (res: any) => {
        if(res) {
        }
      }
    ))
  };

  deleteUser(_id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/api/users/`+_id+`?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  addPlace(place: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/api/places?token=${this.getToken()}`, place).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  updatePlace(place: any, _id:string): Observable<any> {
    return this.httpClient.put<any>(`${this.api}/api/places/`+_id+`?token=${this.getToken()}`, place).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  deletePlace(_id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/api/places/`+_id+`?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  getPlaces(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/places?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  searchPlace(fullAddress?: string): Observable<any>{
    return this.httpClient.get<any>(`${this.api}/api/places/search?token=${this.getToken()}&fullAddress=${fullAddress}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/users?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  getPlace(_id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/places/`+_id+`?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };
  
  dataProfile(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/users/dataProfile?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  updateUser(user: any, userId: any){
    return this.httpClient.put<any>(`${this.api}/api/users/${userId}?token=${this.getToken()}`, user).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  getReviews(placeId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/reviews?token=${this.getToken()}&palceId=${placeId}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };
  
  updateReview(review: any, _id:any): Observable<any> {
    return this.httpClient.put<any>(`${this.api}/api/reviews/${_id}?token=${this.getToken()}`, review).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  deleteReview(_id:any): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/api/reviews/${_id}?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  getReviewsPerUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/reviews/user?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  addReview(review: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/api/reviews?token=${this.getToken()}`, review).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  getReview(reviewId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/api/reviews/${reviewId}?token=${this.getToken()}`).pipe(tap(
      (res: any) => {
        if(res) {

        }
      }
    ))
  };

  private saveToken(token: string, role: string) {
    localStorage.setItem("validToken", token);
    localStorage.setItem("role", role);
  }

  private getToken(){
    let token = localStorage.getItem("validToken");
    return token;
  };

}
