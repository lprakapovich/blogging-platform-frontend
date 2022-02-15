import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input()
  navbarTemplate!: TemplateRef<any>;
  template: string = 'default';

  showModal: boolean = false;

  constructor(private navbarTemplateService: NavbarService) {
    navbarTemplateService.getNavbarTemplateChangeSubject().subscribe(template => {
      this.template = template;
    })

    navbarTemplateService.getNavbarUnselectChangeSubject().subscribe(() => {
      let blogNavigationElement = document.getElementById('blog-navigation');
      if (blogNavigationElement) {
        this.removeSelection(blogNavigationElement)
      }
    })
  }

  setBlogNavigationTabActive(tabId: string) {
    let blogNavigationElement = document.getElementById('blog-navigation');
    if (blogNavigationElement) {
      this.removeSelection(blogNavigationElement)
      blogNavigationElement?.querySelector(`#${tabId}`)?.classList.add('active');
      this.showModal = tabId == 'profile' ? !this.showModal : false;
      this.navbarTemplateService.showProfileSettingsModal(this.showModal);
    }
  }

  private removeSelection(element: HTMLElement) {
    element?.querySelector('.active')?.classList.remove('active');
  }
}

