import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('form')
  htmlForm: any;

  data = {
    firstName: '',
    lastName: '',
    password: '',
    rePass: '',
    email: '',
    seqQuestion: '',
    seqAnswer: '',
    gender: ''
  }

  error: any = null;

  notSamePasswordsError = 'Passwords must be the'

  userData: any = {
    firstName: '', 
    lastName: '', 
    email: '', 
    gender: '', 

  }

  constructor
    (private authService: AuthService,
      private router: Router
    ) { }



  ngOnInit(): void {
  }

  register(formData: any) {
    try {

      if (!this.htmlForm.inavlid) {

        this.data.firstName = formData.form.controls.firstName.value;
        this.data.lastName = formData.form.controls.lastName.value;
        this.data.password = formData.form.controls.password.value;
        this.data.rePass = formData.form.controls.rePass.value;
        this.data.email = formData.form.controls.email.value;
        this.data.seqQuestion = formData.form.controls.seqQuestion.value;
        this.data.seqAnswer = formData.form.controls.seqAnswer.value;
        this.data.gender = formData.form.controls.gender.value;

        if (this.data.rePass != this.data.password) {
          this.error = 'Passwords must be the same';
          throw new Error('Passwords must be the same')
        }
      }
    } catch (err) {
      this.htmlForm.resetForm();
      // this.htmlForm.invalid = true;
      console.error(err);
    }

    this.authService.register(this.data)
      .subscribe(
        (res) => {
          if (res.message == 'An error has occured') {
            console.log('An error has occured')
            this.error = res.error;
          } else {
            
            console.log('else');
            console.log(res);

            this.error = null;
            this.htmlForm.resetForm();

            localStorage.setItem('token', res.token);
            localStorage.setItem('email', res.user.email);
            localStorage.setItem('firstName', res.user.firstName);
            localStorage.setItem('lastName', res.user.lastName);
            localStorage.setItem('gender', res.user.gender);

            this.router.navigate(['catalog'])
            .then(() => {
              window.location.reload();
            });
          }
        }
      )
    console.log(this.data)
  }

  checkIfPasswordsEqual(password: any, repass: any) {
    if (password != repass && password == '') {
      this.htmlForm.form.status = 'INVALID';
    } else {
      this.htmlForm.form.status = 'VALID';
    }
  }

}
