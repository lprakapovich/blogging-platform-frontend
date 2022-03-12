import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {register} from "../../../store/actions/auth.actions";
import {selectIsLoading, selectRegisterError} from "../../../store/app.state";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  isLoading$: Observable<boolean>;
  isRegisterError$: Observable<boolean>;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.registerForm = this.formBuilder.group({
      blogUri: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isRegisterError$ = this.store.select(selectRegisterError);
  }

  get form() {
    return this.registerForm.controls;
  }

  onSignUp() {
    if (this.registerForm.invalid) {
      return;
    }
    const registrationData = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      blogUri: this.registerForm.get('blogUri')?.value
    }
    this.store.dispatch(register({payload: registrationData}))
  }

  goToLogin() {
    this.router.navigate(['login'])
  }
}
