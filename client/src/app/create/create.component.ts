import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../services/recipeService/recipe.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  @ViewChild('form')
  htmlForm: any;

  data = {
    name: '',
    dishType: '',
    imageUrl: '',
    servings: '',
    ingredients: '',
    preparation: '',
    caloriesRecipe: '',
    carbsRecipe: '',
    fatRecipe: '',
    proteinRecipe: '',
    caloriesServing: '',
    carbsServing: '',
    fatServing: '',
    proteinServing: '',
    details: '',
    _token: ''
  }




  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  create(formData: any) {
    const token = localStorage.getItem('token');
    if (!this.htmlForm.invalid) {

      this.data.name = formData.form.controls.name.value;
      this.data.dishType = formData.form.controls.dishType.value;
      this.data.imageUrl = formData.form.controls.imageUrl.value;
      this.data.servings = formData.form.controls.servings.value;
      this.data.ingredients = formData.form.controls.ingredients.value;
      this.data.preparation = formData.form.controls.preparation.value;
      this.data.caloriesRecipe = formData.form.controls.caloriesRecipe.value;
      this.data.carbsRecipe = formData.form.controls.carbsRecipe.value;
      this.data.fatRecipe = formData.form.controls.fatRecipe.value;
      this.data.caloriesServing = formData.form.controls.caloriesServing.value;
      this.data.carbsServing = formData.form.controls.carbsRecipe.value;
      this.data.fatServing = formData.form.controls.fatServing.value;
      this.data.proteinServing = formData.form.controls.proteinServing.value;
      this.data.details = formData.form.controls.details.value;
      if (token != null) {
        this.data._token = token;
      }

      console.log(this.data)
      this.htmlForm.reset();

      this.recipeService.postRecipe(this.data)
        .subscribe(
          (res) => {
            console.log(res)
          }
        )

    }

  }

}
