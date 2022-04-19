import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild('form')
  htmlForm: any;

  data = {
    email: '',
    password: ''
  };

  error = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { };

  ngOnInit(): void {
  }

  login(formData: any) {
    if (!this.htmlForm.invalid) {

      this.data.email = formData.form.controls.email.value;
      this.data.password = formData.form.controls.password.value;

      console.log(this.data);

      this.authService.login(this.data)
        .subscribe(
          (res) => {
            if (res.message == 'Incorrect username or password') {
              this.error = res.message;
              this.htmlForm.form.value.email = this.data.email;
              this.data.password = '';
              this.htmlForm.form.value.password = '';
            } else {
              this.error = null;
              console.log('else')
              localStorage.setItem('token', res.token)
              localStorage.setItem('email', res.user.email)
              localStorage.setItem('firstName', res.user.firstName);
              this.htmlForm.resetForm();
              this.router.navigate(['catalog'])
              .then(() => {
                window.location.reload();
              });
            }
          },
        )

    }
  }
}
