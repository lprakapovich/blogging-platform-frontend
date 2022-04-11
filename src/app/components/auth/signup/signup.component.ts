import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthActionTypes, register, validateUsername} from "../../../store/actions/auth.actions";
import {
  selectRegisterIsError,
  selectRegisterIsLoading,
  selectUsernameValidationIsLoading,
  selectValidationMessage
} from "../../../store/selectors/auth.selectors";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  isUsernameValidationLoading$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isRegisterError$: Observable<boolean>;
  registrationValidationMessage$: Observable<string>;

  validatedUsername: string;
  registerForm: FormGroup;

  constructor(
    private store: Store,
    private actions$: Actions,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.validatedUsername = '';

    this.registerForm = this.formBuilder.group({
      blogUrl: ['', [
        Validators.required,
        Validators.minLength(2)],
      ],
      username: ['', [
        Validators.required,
        Validators.minLength(2)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(2)]
      ]
    });

    this.isLoading$ = this.store.select(selectRegisterIsLoading);
    this.isRegisterError$ = this.store.select(selectRegisterIsError);
    this.isUsernameValidationLoading$ = this.store.select(selectUsernameValidationIsLoading);
    this.registrationValidationMessage$ = this.store.select(selectValidationMessage);

    this.actions$.pipe(
      ofType(AuthActionTypes.VALIDATE_USERNAME_SUCCESS),
      map((action: any) => action.username),
      takeUntil(this.unsubscribe$)
    ).subscribe(val => this.validatedUsername = val)
  }

  ngOnDestroy() {
    console.log('destroy SignupComponent');
    this.registerForm.reset();
    this.validatedUsername = '';
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    this.registerForm.reset();
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  usernameInputEventChanged($event: any) {
    if (this.form['username'].invalid) {
      return;
    }
    const username = $event.target.value;
    if (username.trim().length > 0 && username !== this.validatedUsername) {
      this.store.dispatch(validateUsername({principal: username}))
    }
  }
}
