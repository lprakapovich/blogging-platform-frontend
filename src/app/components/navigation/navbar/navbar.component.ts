import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NavbarTemplateService} from "../../../services/navbar-template.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  navbarTemplate!: TemplateRef<any>;

  template: string = 'default';

  constructor(private navbarTemplateService: NavbarTemplateService) {
    navbarTemplateService.getNavbarTemplateChangeSubject().subscribe(template => {
      this.template = template;
    })
  }

  ngOnInit(): void {
  }
}
