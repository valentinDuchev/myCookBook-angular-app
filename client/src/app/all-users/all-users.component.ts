import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})


export class AllUsersComponent implements OnInit {

  users: any;

  page: number = 1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllProfiles().subscribe(
      (res) => {
        this.users = res.users;
        console.log(this.users)
      }
    )
  }

}
