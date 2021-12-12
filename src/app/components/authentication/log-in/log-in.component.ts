import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {first} from "rxjs";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
              ) {
    if (authenticationService.currentUserValue()) {
      console.log('USER IS AUTHENTICATED ALREADY - REDIRECT TO ITS BLOG');
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  get f() { return this.loginForm.controls };

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(
      this.f['username'].value, this.f['password'].value
    ).subscribe(response => {
        console.log(response)
        console.log('AUTHENTICATION SUCCESS')
        localStorage.setItem('token', response.token)
      },
        error => {
        this.loading = false;
      })
  }
}
