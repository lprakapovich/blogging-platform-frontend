import {Component} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private navbarTemplateService: NavbarTemplateService,
              private router: Router) {
    this.navbarTemplateService.setDefaultTemplate();
  }

  onGoClicked() {
    this.router.navigate(['register'])
  }
}

