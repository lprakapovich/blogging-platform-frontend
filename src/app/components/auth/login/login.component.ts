import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectLoginIsError, selectLoginIsLoading} from "../../../store/selectors/auth.selectors";
import {login} from "../../../store/actions/auth.actions"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  isLoginFormSubmitted$: Observable<boolean>;
  isLoginError$: Observable<boolean>;

  loginForm: FormGroup;

  // todo display validation errors
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navbarTemplateService: NavbarTemplateService,
    private store: Store) {

    this.navbarTemplateService.setDefaultTemplate();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectLoginIsLoading);
    this.isLoginError$ = this.store.select(selectLoginIsError)
  }

  ngOnDestroy() {
    console.log('destroy LoginComponent')
  }

  get form() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = {
       username: this.loginForm.get('username')?.value,
       password: this.loginForm.get('password')?.value
    }
    this.store.dispatch(login({payload: loginData}));
  }

  navigateToRegister() {
    this.router.navigate(['register'])
  }
}
