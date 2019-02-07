import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)])

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.createUser(this.email.value, this.password.value)
        .subscribe(data => {
          this.snackBar.openFromComponent(RegistrationSuccessfulComponent, {
            duration: 3000,
          });
          this.router.navigate(['/login'])
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

@Component({
  selector: 'registration-successful-component',
  template: `<span class="registrationSuccessful">
              Registration was successful. Please log in to continue shopping.
              </span>`,
  styles: [`
    .registrationSuccessful {
      color: lightgreen;
      font-size: 0.7em;
    }
  `],
})
export class RegistrationSuccessfulComponent { }