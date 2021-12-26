import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private navbarTemplateService: NavbarService) {
    this.navbarTemplateService.setDefaultTemplate();
  }
}
