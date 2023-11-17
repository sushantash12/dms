import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        height: '0px',
        opacity: 0
      })),
      state('*', style({
        height: '*',
        opacity: 1
      })),
      transition('void <=> *', animate(300)),
    ])
  ]
})
export class LoginSignupComponent {
  register = false;
  title: any[] = "Document Management System".split('');

  constructor(private router: Router, private apiService: ApiService, private snack: MatSnackBar) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // sessionStorage.setItem('loggedIn', 'true');
      // this.router.navigate(['/dashboard']);
      console.log(form.value);
      if(this.register){
        const obj = {
          username: form.value.username,
          password: form.value.password,
          email: form.value.email
        };

        this.apiService.registerUser(obj).then(async (response) => {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', form.value.username);
            const data = {
              file: '',
              filepath: form.value.username
            }
            await this.apiService.createFolder(data).then((response) => {
              console.log(response);
            });
            this.snack.open(response.message, 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard']);
        }, (error) => {
            this.snack.open(error.error.message, 'Close', { duration: 3000 });
        });
      }

      else{
        const obj = {
          username: form.value.username,
          password: form.value.password
        };

        this.apiService.loginUser(obj).then((response) => {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', form.value.username);
            this.snack.open(response.message, 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard']);
        }, (error) => {
            this.snack.open(error.error.message, 'Close', { duration: 3000 });
        });
      }
    }
  }
}
