import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navbarTemplate = 'default';
  private navbarTemplateChange: Subject<string> = new Subject<string>();
  private navbarShowModalChange: Subject<boolean> = new Subject<boolean>();
  private navbarUnselectChange: Subject<void> = new Subject<void>();

  constructor() {
    this.navbarTemplateChange.subscribe(value => {
      this.navbarTemplate = value
    });
  }

  setBlogTemplate() {
    this.navbarTemplateChange.next('blog');
  }

  setEditorTemplate() {
    this.navbarTemplateChange.next('editor');
  }

  setDefaultTemplate() {
    this.navbarTemplateChange.next('default');
  }

  getNavbarTemplateChangeSubject() {
    return this.navbarTemplateChange;
  }

  getNavbarShowModalChangeSubject() {
    return this.navbarShowModalChange;
  }

  getNavbarUnselectChangeSubject() {
    return this.navbarUnselectChange;
  }

  showProfileSettingsModal(show: boolean) {
    this.navbarShowModalChange.next(show);
  }

  unselectAll() {
    this.navbarUnselectChange.next();
  }
}
