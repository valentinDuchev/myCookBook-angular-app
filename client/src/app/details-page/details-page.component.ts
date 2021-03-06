import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { RecipeService } from '../services/recipeService/recipe.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  id: any;
  isAuthor: any = false;
  currentUserEmail: any = localStorage.getItem('email');

  data = {
    caloriesRecipe: '',
    caloriesServing: '',
    carbsRecipe: '',
    carbsServing: '',
    dishType: '',
    dislikes: '',
    fatRecipe: '',
    fatServing: '',
    imageUrl: '',
    ingredients: '',
    likes: '',
    name: '',
    peopleDisliked: '',
    peopleLiked: '',
    preparation: '',
    proteinRecipe: '',
    proteinServing: '',
    servings: '',
    author: '',
    _id: ''
  }

  constructor
    (
      private activatedRoute: ActivatedRoute,
      private recipeService: RecipeService,
      private authService: AuthService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.recipeService.getSingleRecipe(this.id)
      .subscribe(
        (res) => {
          this.data._id = res.result._id
          this.data.caloriesRecipe = res.result.caloriesRecipe,
            this.data.caloriesServing = res.result.caloriesServing,
            this.data.carbsRecipe = res.result.carbsRecipe,
            this.data.carbsServing = res.result.carbsServing,
            this.data.dishType = res.result.dishType,
            this.data.dislikes = res.result.dislikes,
            this.data.fatRecipe = res.result.fatRecipe,
            this.data.fatServing = res.result.fatServing,
            this.data.imageUrl = res.result.imageUrl,
            this.data.ingredients = res.result.ingredients,
            this.data.likes = res.result.likes,
            this.data.name = res.result.name,
            this.data.peopleDisliked = res.result.peopleDisliked,
            this.data.peopleLiked = res.result.peopleLiked,
            this.data.preparation = res.result.preparation,
            this.data.proteinRecipe = res.result.proteinRecipe,
            this.data.proteinServing = res.result.proteinServing,
            this.data.servings = res.result.servings,
            this.data.author = res.result.author

          console.log(this.data.author)

          console.log(this.currentUserEmail.toString() == this.data.author)

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
          res.then(window.location.reload())
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

  editRecipe(id: any) {
    this.router.navigate([`edit/${id}`])
  }

  deleteRecipe(id: any) {
    this.recipeService.deleteRecipe(id).subscribe(
      (res) => {
        if (res.message == 'Successfully deleted') {
          alert(res.message);
          this.router.navigate(['myProfile'])
        }
      }
    )
  }



}
