import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, { validators: PasswordValidation.MatchPassword });
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
          this.email.reset();
          this.password.reset();
          this.snackBar.openFromComponent(EmailTakenComponent, {
            duration: 3000
          })
        })
    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required.' :
      this.email.hasError('email') ? 'Not a valid email.' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required.' :
      this.password.hasError('minlength') ? 'Password must be minimum 6 characters long.' : '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'Password is required.' :
      this.confirmPassword.hasError('minlength') ? 'Password must be minimum 6 characters long.' : '';
  }

}

export class PasswordValidation {

  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
    if (password != confirmPassword) {
      abstractControl.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      return null
    }
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

@Component({
  selector: 'email-taken-component',
  template: `<span class="emailTaken">
              Email address already registered.
              Try again with another one.
              </span>`,
  styles: [`
    .emailTaken {
      color: #e52727;
      font-size: 0.8em;
    }
  `],
})
export class EmailTakenComponent { }