import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)])

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.email.value, this.password.value)
        .subscribe(data => {
          window.location.reload();
        }, error => {
          console.log(error);
        })

    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required.' :
      this.email.hasError('email') ? 'Not a valid email.' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required.' :
      this.password.hasError('minlength') ? 'Password must be minimum 6 character long.' : '';
  }

}
