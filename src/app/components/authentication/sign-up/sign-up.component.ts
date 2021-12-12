import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {first} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {

    if (this.authenticationService.currentUserValue()) {
      console.log('USER IS AUTHENTICATED::LEAVE REGISTER')
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['a', Validators.required],
      lastName: ['a', Validators.required],
      username: ['a', Validators.required],
      password: ['aaaaa', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('INVALID FORM')
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.registerForm.value).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        console.log('REGISTRATION SUCCESS')
        console.log(response.token);
        this.router.navigate(['/login'])
      }, () => {
        this.loading = false;
      });
  }
}
