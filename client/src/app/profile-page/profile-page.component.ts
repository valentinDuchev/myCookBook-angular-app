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
    posted: [], 
    totalRecipeLikes: '', 
    totalRecipeDislikes: '',
  }

  date: any = '';

  dateLiked: any = ''

  pagePosted: number = 1;
  pageLiked: number = 1;


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
        this.data.disliked = res.userData.disliked
        this.data.totalRecipeLikes = res.userData.totalRecipeLikes;
        this.data.totalRecipeDislikes = res.userData.totalRecipeDislikes;
        this.data.level = res.userData.level;
        this.data.rank = res.userData.rank;
        this.data.rating = res.userData.rating;

        console.log(this.data.gender)

        for (let recipe of this.data.posted) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          this.date = new Date(recipe.dateCreated);
          this.date = this.date.toLocaleDateString("en-US", options);
        }

        this.data.posted = this.data.posted.sort((a: { dateCreated: number; }, b: { dateCreated: number; }) => {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        })

        this.data.liked = this.data.liked.sort((a: { dateCreated: string | number | Date; }, b: { dateCreated: string | number | Date; }) => {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        })

        for (let recipe of this.data.liked) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          this.dateLiked = new Date(recipe.dateCreated);
          this.dateLiked = this.dateLiked.toLocaleDateString("en-US", options);
        }
      }
    )
  }




}
