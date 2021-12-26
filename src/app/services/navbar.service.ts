import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navbarTemplate = 'default';
  private navbarTemplateChange: Subject<string> = new Subject<string>();
  private navbarShowModalChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.navbarTemplateChange.subscribe(value => {
      this.navbarTemplate = value
    });
  }

  setBlogTemplate() {
    this.navbarTemplateChange.next('blog');
    this.moveNavbarToTop();
  }

  setEditorTemplate() {
    this.navbarTemplateChange.next('editor');
    this.moveNavbarToTop()
  }

  setDefaultTemplate() {
    this.navbarTemplateChange.next('default');
    this.moveNavbarToBottom()
  }

  getNavbarTemplateChangeSubject() {
    return this.navbarTemplateChange;
  }

  getNavbarShowModalChangeSubject() {
    return this.navbarShowModalChange;
  }

  showProfileSettingsModal(show: boolean) {
    this.navbarShowModalChange.next(show);
  }

  private moveNavbarToBottom() {
    this.swapNavbarStyles('top-fixed', 'bottom-fixed')
  }

  private moveNavbarToTop() {
    this.swapNavbarStyles('bottom-fixed', 'top-fixed')
  }

  private swapNavbarStyles(from: string, to: string) {
    let navbar = document.getElementById('navbar');
    navbar?.classList.remove(from);
    navbar?.classList.add(to);
  }
}
