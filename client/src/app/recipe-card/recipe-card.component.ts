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

  constructor(private recipeService: RecipeService) { }

  

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe( data => {
      this.allRecipes = data;
      
      this.singleRecipe = this.allRecipes.result;
    })
  }

  getSingleRecipe (id: any) {
    console.log(id)
    this.recipeService.getSingleRecipe(id)
    .subscribe(
      (res) => {
        console.log(res.result.caloriesRecipe);
    })
  }

}
