import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DetailsPageComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    RecipeCardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent }, 
      { path: 'login', component: LoginComponent }, 
      { path: 'create', component: CreateComponent }, 
      { path: 'details-page', component: DetailsPageComponent }, 
      { path: 'catalog', component: RecipeCardComponent }, 
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
