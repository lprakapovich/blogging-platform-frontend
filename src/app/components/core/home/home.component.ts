import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private navbarTemplateService: NavbarService,
              private router: Router) {
    this.navbarTemplateService.setDefaultTemplate();
  }

  onGoClicked() {
    this.router.navigate(['register'])
  }
}

