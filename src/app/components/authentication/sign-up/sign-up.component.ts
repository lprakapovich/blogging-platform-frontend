import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";

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
      firstName: ['name', Validators.required],
      lastName: ['surname', Validators.required],
      username: [new Date(), Validators.required],
      password: ['password', Validators.required]
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
        console.log(response.token);
      }, () => {
        this.loading = false;
      });
  }
}
