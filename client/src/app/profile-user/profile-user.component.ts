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

  pagePosted: number = 1;


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

    date: any = '';

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
        this.data.rank = res.userData.rank
        this.data.rating = res.userData.rating
        this.data.disliked = res.userData.disliked
        this.data.totalRecipeDislikes = res.userData.totalRecipeDislikes
        this.data.totalRecipeLikes = res.userData.totalRecipeLikes

        for (let recipe of this.data.posted) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          this.date = new Date(recipe.dateCreated);
          this.date = this.date.toLocaleDateString("en-US", options);
        }

        this.data.posted = this.data.posted.sort((a: { dateCreated: string | number | Date; }, b: { dateCreated: string | number | Date; }) => {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        })

        
      }
    )
    
  }

  }
