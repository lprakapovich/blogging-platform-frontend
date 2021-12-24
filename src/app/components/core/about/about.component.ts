import { Component, OnInit } from '@angular/core';
import {NavbarTemplateService} from "../../../services/navbar-template.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private navbarTemplateService: NavbarTemplateService) {
    this.navbarTemplateService.setDefault();
  }
}
