import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  token: any;
  hasNoUser = false;
  hasUser = false;

  user = localStorage.getItem('firstName');

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token == undefined) {
      this.hasNoUser = true;
    } else {
      this.hasUser = true;
    }
  }

  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('userData') 
    this.router.navigate(['catalog'])
    .then(() => {
      window.location.reload();
    })
  }



}
