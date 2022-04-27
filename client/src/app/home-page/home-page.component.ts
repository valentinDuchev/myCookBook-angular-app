import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  user: any = localStorage.getItem('token');

  constructor(private router: Router
  ) { }

  token: any = localStorage.getItem('token');



  ngOnInit(): void {

  }

}
