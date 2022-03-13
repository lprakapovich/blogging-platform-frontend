import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavbarService} from "../../../services/navbar.service";
import {InformationModalService} from "../../../services/information-modal.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsLoading, selectLoginError} from "../../../store/selectors/auth.selectors";
import {login, resetLoginFailure} from "../../../store/actions/auth.actions"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  isLoginFormSubmitted$: Observable<boolean>;
  showLoginError$: Observable<boolean>;

  loginForm: FormGroup;

  @ViewChild('modal', { read: ViewContainerRef })
  entry: ViewContainerRef;
  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navbarTemplateService: NavbarService,
    private informationModalService: InformationModalService,
    private store: Store) {

    this.navbarTemplateService.setDefaultTemplate();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.showLoginError$ = this.store.select(selectLoginError)
  }

  ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

  get f() {
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

  resetLoginFailure() {
    this.store.dispatch(resetLoginFailure());
  }
}
