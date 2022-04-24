import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RegisterComponent } from './register/register.component';
import { RecipeService } from './services/recipeService/recipe.service';
import { AuthService } from './services/authService/auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { AuthGuard } from './services/guards/auth-token.guard';
import { AuthNotLoggedGuard } from './services/guards/auth-not-logged.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { SearchService } from './services/searchService/search.service';
import { SearchedComponent } from './searched/searched.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DetailsPageComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    RecipeCardComponent,
    RegisterComponent,
    HomePageComponent,
    AboutPageComponent,
    ProfilePageComponent,
    ProfileUserComponent,
    SearchedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent, canActivate: [AuthNotLoggedGuard] },
      { path: 'login', component: LoginComponent, canActivate: [AuthNotLoggedGuard] },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard]  },
      { path: 'details/:id', component: DetailsPageComponent}, //, canActivate: [AuthGuard] 
      { path: 'catalog', component: RecipeCardComponent },
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent}, 
      { path: 'myProfile', component: ProfilePageComponent, canActivate: [AuthGuard] }, 
      { path: 'profile/:email', component: ProfileUserComponent }, 
      { path: 'searched', component: SearchedComponent}
      // { path: 'recipes/:id/like', component: , canActivate: [AuthGuard] }
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RecipeService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard, 
    AuthNotLoggedGuard, 
    SearchService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
