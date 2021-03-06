import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>('http://localhost:3000/api/recipes');
  }

  postRecipe(data: any): Observable<any> {
    const header: any = new HttpHeaders();
    header.append('token', localStorage.getItem('token'));
    return this.http.post<Recipe>('http://localhost:3000/api/recipes', data);
  }

  getSingleRecipe (id: any): Observable<any> {
    return this.http.get<Recipe>('http://localhost:3000/api/recipes/' + id);
  } 

  like (id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/recipes/${id}/like`);
  }

  dislike(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/recipes/${id}/dislike`);
  }

  search(param: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/search/${param}`);
  }

  editRecipe (id: any, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/recipes/${id}`, data);
  }

  deleteRecipe (id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/recipes/${id}`);
  }
}
