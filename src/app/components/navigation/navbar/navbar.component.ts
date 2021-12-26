import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NavbarTemplateService} from "../../../services/navbar-template.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input()
  navbarTemplate!: TemplateRef<any>;

  template: string = 'default';

  constructor(private navbarTemplateService: NavbarTemplateService) {
    navbarTemplateService.getNavbarTemplateChangeSubject().subscribe(template => {
      this.template = template;
    })

    this.setModalListener();
  }

  private setModalListener() {
    let profileButton = document.getElementById('blog-navigation');
    console.log('blog navigation:')
    console.log(profileButton)
  }

  setBlogNavigationTabActive(tabId: string) {
    let blogNavigationElement = document.getElementById('blog-navigation');
    blogNavigationElement?.querySelector('.active')?.classList.remove('active');
    blogNavigationElement?.querySelector(`#${tabId}`)?.classList.add('active');
  }
}

