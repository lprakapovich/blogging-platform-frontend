import {AfterViewInit, Component, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavbarService} from "../../../services/navbar.service";
import {InformationModalService} from "../../../services/information-modal.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState, isLoading} from "../../../store/app.state";
import { Login } from "../../../store/actions/auth.actions"
import * as FromRoot from "../../../store/app.state"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  isLoading$: Observable<boolean> = this.store.select(FromRoot.isLoading);

  loginForm: FormGroup;
  submitted = false;
  showAlert = false;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navbarTemplateService: NavbarService,
    private informationModalService: InformationModalService,
    private store: Store<AppState>) {

    this.navbarTemplateService.setDefaultTemplate();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;
    this.showAlert = true;

    if (this.loginForm.invalid) {
      console.log('invalid form')
      return;
    }

    const loginData = {
       username: this.loginForm.get('username')?.value,
       password: this.loginForm.get('password')?.value
    }

    this.store.dispatch(Login(loginData));
  }

  private showModal() {
    this.showAlert = !this.showAlert;
  }

  goToRegisterView() {
    this.router.navigate(['register'])
  }
}
