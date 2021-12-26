import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private navbarTemplateService: NavbarService) {
    this.navbarTemplateService.setDefaultTemplate();
  }
}
