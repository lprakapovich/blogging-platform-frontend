import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarTemplateService {

  private navbarTemplate = 'default';
  private navbarTemplateChange: Subject<string> = new Subject<string>();

  constructor() {
    this.navbarTemplateChange.subscribe(value => {
      this.navbarTemplate = value
    });
  }

  setNavbarTemplate(template: string) {
    this.navbarTemplateChange.next(template);
  }

  setDefault() {
    this.navbarTemplateChange.next('default');
  }

  getNavbarTemplate() {
    return this.navbarTemplate;
  }

  getNavbarTemplateChangeSubject() {
    return this.navbarTemplateChange;
  }
}
