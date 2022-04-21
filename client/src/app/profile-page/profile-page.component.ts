import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {


  data: any = {
    firstName: '',
    lastName: '', 
    gender: '', 
    email: '', 
    liked: [], 
    posted: []
  }


  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    this.authService.getProfileInfo().subscribe(
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
