import { Component, OnInit } from '@angular/core';
import {NavbarTemplateService} from "../../../services/navbar-template.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private navbarTemplateService: NavbarTemplateService) {
    this.navbarTemplateService.setDefault();
  }
}
