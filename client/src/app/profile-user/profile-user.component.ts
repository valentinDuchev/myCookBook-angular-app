import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})


export class ProfileUserComponent implements OnInit {

  email: string = '';


  constructor(
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService
    ) { }

    data: any = {
      firstName: '',
      lastName: '', 
      gender: '', 
      email: '', 
      liked: [], 
      posted: [], 
    }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email'];

    this.authService.getUserProfileInfo(this.email).subscribe(
      (res) => { 
        console.log(res)

        this.data.firstName = res.userData.firstName
        this.data.lastName = res.userData.lastName 
        this.data.email = res.userData.email
        this.data.gender = res.userData.gender
        this.data.liked = res.userData.liked
        this.data.posted = res.userData.posted

        
      }
    )
    
  }

  }
