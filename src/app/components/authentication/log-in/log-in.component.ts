import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private navbarTemplateService: NavbarService) {

    this.navbarTemplateService.setDefaultTemplate();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls };

  onSubmitLogin() {
    this.submitted = true;

    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.loading = true;

    this.router.navigate(['/blog']);

    // this.authenticationService.login(
    //   this.f['username'].value, this.f['password'].value
    // ).subscribe(response => {
    //     localStorage.setItem('token', response.token)
    //   },
    //     () => {
    //     this.loading = false;
    //   })
  }
}
