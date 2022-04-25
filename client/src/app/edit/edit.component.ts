import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipeService/recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  data: any;

  updatedData: any;

  error: any = '';

  @ViewChild('form')
  htmlForm: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data = {

    }
    const recipeId = this.activatedRoute.snapshot.params['id'];
    this.recipeService.getSingleRecipe(recipeId).subscribe(
      (res) => {
        this.data = res.result;
        console.log(this.htmlForm)
      }
    )


  }

  editRecipe(id: any, formData: any) {
    this.updatedData = {

    }
    if (!this.htmlForm.invalid) {

      this.updatedData.name = formData.form.controls.name.value;
      this.updatedData.dishType = formData.form.controls.dishType.value;
      this.updatedData.imageUrl = formData.form.controls.imageUrl.value;
      this.updatedData.servings = formData.form.controls.servings.value;
      this.updatedData.ingredients = formData.form.controls.ingredients.value;
      this.updatedData.preparation = formData.form.controls.preparation.value;
      this.updatedData.caloriesRecipe = formData.form.controls.caloriesRecipe.value;
      this.updatedData.carbsRecipe = formData.form.controls.carbsRecipe.value;
      this.updatedData.fatRecipe = formData.form.controls.fatRecipe.value;
      this.updatedData.caloriesServing = formData.form.controls.caloriesServing.value;
      this.updatedData.carbsServing = formData.form.controls.carbsRecipe.value;
      this.updatedData.fatServing = formData.form.controls.fatServing.value;
      this.updatedData.proteinServing = formData.form.controls.proteinServing.value;
      this.updatedData.details = formData.form.controls.details.value;
      this.updatedData.proteinRecipe = formData.controls.proteinRecipe.value;

      this.recipeService.editRecipe(id, this.updatedData).subscribe(
        (res) => {
          if (res.message == 'Successfully edited') {
            this.router.navigate(['catalog'])
            this.htmlForm.reset();
          } else {
            this.error = res.message;
          }

        }
      );
    }

  }
  
  
}
