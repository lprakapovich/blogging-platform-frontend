import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {NavbarService} from "../../../services/navbar.service";

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
    private authenticationService: AuthenticationService,
    private navbarTemplateService: NavbarService) {

    // this.navbarTemplateService.setDefaultTemplate();

    this.registerForm = this.formBuilder.group({
      blogUri: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSignUp() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('INVALID FORM')
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
        console.log(response.token);
      }, () => {
        this.loading = false;
      });
  }

  goToLogin() {
    this.router.navigate(['login'])
  }
}
