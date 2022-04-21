import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthNotLoggedGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const token = localStorage.getItem('token');
    if (token == undefined) {
      return true;
    } else {
      alert('You cannot access login and register page if you are already logged in')
      this.router.navigate([''])
        .then(() => {
          window.location.reload();
        });
      return false;
    }
  }

}
