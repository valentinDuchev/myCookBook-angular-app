import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipeService/recipe.service';
import { Recipe } from '../models/Recipe'

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  allRecipes!: any;
  singleRecipe!: any;

  page: number = 1;

  response: any = {

  }

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((res) => {
      this.response = res;
      this.allRecipes = this.response.result.sort((a: { dateCreated: any; }, b: { dateCreated: any; }) => {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      })
      this.singleRecipe = this.allRecipes;

      this.singleRecipe = this.allRecipes;
    })
  }

  getSingleRecipe(id: any) {
    console.log(id)
    this.recipeService.getSingleRecipe(id)
      .subscribe(
        (res) => {
          console.log(res.result.caloriesRecipe);
        })
  }

  like(id: any) {
    this.recipeService.like(id).subscribe(
      (res) => {
        if (res.message == 'You have already liked this recipe') {
          alert(res.message)
        } else if (res.message == 'Author cannot like their own recipes') {
          alert(res.message)
        } else {
          res.then(alert('Succesfully liked'))
        }
      }
    )
  }

  dislike(id: any) {
    this.recipeService.dislike(id).subscribe(
      (res) => {
        if (res.message == 'You have already disliked this recipe') {
          alert(res.message)
        } else if (res.message == 'Author cannot dislike their own recipes') {
          alert(res.message)
        } else {
          res.then(window.location.reload())
        }
      }
    )
  }

  filter(param: any) {

    this.recipeService.getAllRecipes().subscribe(
      (res) => {
        this.response = res;

        if (param == 'appetizer') {
          this.allRecipes = this.response.result.filter((recipe: { dishType: string; }) => recipe.dishType == 'Appetizer');
          this.singleRecipe = this.allRecipes
        } 
        
        else if (param == 'mainDish') {
          this.allRecipes = this.response.result.filter((recipe: { dishType: string; }) => recipe.dishType == 'Main Dish');
          this.singleRecipe = this.allRecipes
        } 
        
        else if (param == 'dessert') {
          this.allRecipes = this.response.result.filter((recipe: { dishType: string; }) => recipe.dishType == 'Dessert');
          this.singleRecipe = this.allRecipes
        } 
        
        else if (param == 'snack') {
          this.allRecipes = this.response.result.filter((recipe: { dishType: string; }) => recipe.dishType == 'Snack');
          this.singleRecipe = this.allRecipes
        } 
        
        else if (param == 'likes') {
          this.allRecipes = this.response.result.sort((a: { likes: number; }, b: { likes: number; }) => {
            return b.likes - a.likes;
          })
          this.singleRecipe = this.allRecipes;
        } 
        
        else if (param == 'dislikes') {
          this.allRecipes = this.response.result.sort((a: { dislikes: number; }, b: { dislikes: number; }) => {
            return b.dislikes - a.dislikes;
          })
          this.singleRecipe = this.allRecipes;
        } 
        
        else if (param == 'oldest') {
          this.allRecipes = res;

          this.singleRecipe = this.allRecipes.result;
        } 
        
        else if (param == 'newest') {
          this.allRecipes = this.response.result.sort((a: { dateCreated: any; }, b: { dateCreated: any; }) => {
            return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
          })
          this.singleRecipe = this.allRecipes;
        }

        else if (param == 'default') {
          this.allRecipes = this.response.result.sort((a: { dateCreated: any; }, b: { dateCreated: any; }) => {
            return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
          })
          this.singleRecipe = this.allRecipes;
        }
      }
    )
  }

}
