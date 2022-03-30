import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {checkAuthenticationAndRedirect, register, validateUsername} from "../../../store/actions/auth.actions";
import {
  selectIsLoading,
  selectRegisterError,
  selectUsernameValidationIsLoading,
  selectValidationMessage
} from "../../../store/selectors/auth.selectors";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  isUsernameValidationLoading$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isRegisterError$: Observable<boolean>;
  registrationValidationMessage$: Observable<string>;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.registerForm = this.formBuilder.group({
      blogUrl: ['', [
        Validators.required,
        Validators.minLength(5)]
      ],
      username: ['', [
        Validators.required,
        Validators.minLength(5)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(5)]
      ]
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isRegisterError$ = this.store.select(selectRegisterError);
    this.isUsernameValidationLoading$ = this.store.select(selectUsernameValidationIsLoading);
    this.registrationValidationMessage$ = this.store.select(selectValidationMessage);
    this.store.dispatch(checkAuthenticationAndRedirect({to: '/feed'}));
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
      blogUrl: this.registerForm.get('blogUrl')?.value
    }
    this.store.dispatch(register({payload: registrationData}))
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  usernameInputEventChanged($event: any) {
    if (this.form['username'].invalid) {
      return;
    }

    const username = $event.target.value;
    if (username.trim().length > 0) {
      this.store.dispatch(validateUsername({username}))
    }
  }
}
