import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipeService/recipe.service';
import { SearchService } from '../services/searchService/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('form')
  htmlForm: any;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private searchService: SearchService
  ) { }

  token: any;
  hasNoUser = false;
  hasUser = false;

  data: any;

  finalData: any;
  recipes: any;
  users: any;

  user = localStorage.getItem('firstName');

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token == undefined) {
      this.hasNoUser = true;
    } else {
      this.hasUser = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData')
    this.router.navigate(['catalog'])
      .then(() => {
        window.location.reload();
      })
  }

  search(formData: any) {
    this.data = formData.form.controls.search.value;
    this.recipeService.search(this.data).subscribe(
      (res) => {
        this.recipes = res.recipes;
        this.users = res.users;
        this.finalData = {
          users: this.users, 
          recipes: this.recipes
        }
        this.searchService.changeMessage(this.finalData)
        this.htmlForm.resetForm()
        this.router.navigate(['searched'])
        
      }
    )
  }



}
