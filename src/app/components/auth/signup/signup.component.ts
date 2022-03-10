import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService) {

    this.registerForm = this.formBuilder.group({
      blogUri: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get form() {
    return this.registerForm.controls;
  }

  onSignUp() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const registrationData = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      blogUri: this.registerForm.get('blogUri')?.value
    }
    this.authenticationService.register(registrationData).subscribe(
      response => {
        localStorage.setItem('token', response.token);
      }, () => {
        // handle error
      });

  }

  goToLogin() {
    this.router.navigate(['login'])
  }
}
