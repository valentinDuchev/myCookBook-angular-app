import { Component, OnInit, ViewChild } from '@angular/core';
import { flushMicrotasks } from '@angular/core/testing';
import { Router } from '@angular/router';
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

  error = null;




  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

  create(formData: any) {
    const token = localStorage.getItem('token');
    if (!this.htmlForm.invalid) {

      this.data.name = formData.form.controls.name.value;
      this.data.dishType = formData.form.controls.dishType.value;
      this.data.imageUrl = formData.form.controls.imageUrl.value;
      this.data.servings = formData.form.controls.servings.value;
      this.data.ingredients = formData.form.controls.ingredients.value.split('/n');
      this.data.preparation = formData.form.controls.preparation.value;
      this.data.caloriesRecipe = formData.form.controls.caloriesRecipe.value;
      this.data.carbsRecipe = formData.form.controls.carbsRecipe.value;
      this.data.fatRecipe = formData.form.controls.fatRecipe.value;
      this.data.caloriesServing = formData.form.controls.caloriesServing.value;
      this.data.carbsServing = formData.form.controls.carbsRecipe.value;
      this.data.fatServing = formData.form.controls.fatServing.value;
      this.data.proteinServing = formData.form.controls.proteinServing.value;
      this.data.details = formData.form.controls.details.value;
      this.data.proteinRecipe = formData.controls.proteinRecipe.value;

      console.log(this.data.ingredients)
      

      this.htmlForm.reset();

      this.recipeService.postRecipe(this.data)
        .subscribe(
          (res) => {
            if (res.message == 'Recipe created successfully') {
              console.log(res)
              this.error = null;
              console.log('else')
              this.htmlForm.resetForm();
              this.router.navigate(['catalog'])
                .then(() => {
                  window.location.reload();
                });

            } else {
              this.error == 'Unsuccessful creation of the recipe';
            }
          }
        )

    }

  }

}
