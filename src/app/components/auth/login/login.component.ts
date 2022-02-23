import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {NavbarService} from "../../../services/navbar.service";
import {InformationModalService} from "../../../services/information-modal.service";
import {Subscription, timeout} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  showAlert = false;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarTemplateService: NavbarService,
    private informationModalService: InformationModalService) {

    this.navbarTemplateService.setDefaultTemplate();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngAfterViewInit(): void {
        // this.showModal();
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
    this.loading = true;
    const loginData = {
       username: this.loginForm.get('username')?.value,
       password: this.loginForm.get('password')?.value
    }
    this.authenticationService.login(loginData).subscribe(response => {
        localStorage.setItem('token', response.token);
        console.log(response.token);
      }, (error) => {
        this.showAlert = true;
        this.loading = false;
      });
  }

  private showModal() {
    this.showAlert = !this.showAlert;
  }

  goToRegisterView() {
    this.router.navigate(['register'])
  }
}
