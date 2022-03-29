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

  registrationProcessMessage: string;

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
      blogUri: this.registerForm.get('blogUri')?.value
    }
    this.store.dispatch(register({payload: registrationData}))
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  inputChangeEvent($event: any) {
    const username = $event.target.value;
    if (username.trim().length > 0) {
      this.store.dispatch(validateUsername({username}))
    }
  }
}
