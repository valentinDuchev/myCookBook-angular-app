import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  token: any = localStorage.getItem('token');

  canActivate() {
    if (this.token) {
      if (this.authService.isTokenExpired(this.token)) {
        alert('You have to sign in your profile.');
        this.router.navigate(['login'])
          .then(() => {
            window.location.reload();
          });
        localStorage.removeItem('token');
        return false;
      } else {
        return true;
      }
    } else {
      alert('You have to sign in your profile.');
        this.router.navigate(['login'])
          .then(() => {
            window.location.reload();
          });
        localStorage.removeItem('token');
        return false;
    }

  }

}
