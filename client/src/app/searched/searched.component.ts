import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/searchService/search.service';

@Component({
  selector: 'app-searched',
  templateUrl: './searched.component.html',
  styleUrls: ['./searched.component.css']
})
export class SearchedComponent implements OnInit {

  recipes: any;
  users: any;
  finalData: any = {

  };

  message: any = 'There are no recipes with this criteria';

  usersMessage: any = 'There are no users with this criteria'

  constructor(private searchedService: SearchService) { }

  ngOnInit(): void {
    this.recipes = [];
    this.users = [];
    this.finalData = {
      recipes: this.recipes,
      users: this.users
    }

    this.searchedService.currentMessage$.subscribe(
      (data) => {

        if (data.recipes != undefined) {
          this.recipes = data.recipes;
          this.users = data.users;
        }

        this.finalData = {
          users: this.users,
          recipes: this.recipes
        }        
      }
    )
  }

}
