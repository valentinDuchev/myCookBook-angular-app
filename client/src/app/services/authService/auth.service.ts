import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post<any>('http://localhost:3000/api/users/login', data);
  }

  register(data: any) {
    return this.http.post<any>('http://localhost:3000/api/users/register', data);
  }

  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  } 

  getProfileInfo() {
    return this.http.get<any>('http://localhost:3000/api/users/myProfile');
  }

  getUserProfileInfo (email: any) {
    return this.http.get<any>(`http://localhost:3000/api/users/userProfile/${email}`);
  }
}
