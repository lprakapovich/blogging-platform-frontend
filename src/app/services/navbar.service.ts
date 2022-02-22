import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarTemplate = 'default';
  private navbarTemplateChange: Subject<string> = new Subject<string>();
  private navbarShowModalChange: Subject<boolean> = new Subject<boolean>();
  private navbarShowEditorRemoveButtonChange: Subject<boolean> = new Subject<boolean>();
  private navbarUnselectChange: Subject<void> = new Subject<void>();
  private showRemove: boolean = false;

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

  showProfileSettingsModal(show: boolean) {
    this.navbarShowModalChange.next(show);
  }

  unselectAll() {
    this.navbarUnselectChange.next();
  }

  adjustRemoveButton(show: boolean) {
    this.navbarShowEditorRemoveButtonChange.next(show);
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

  getNavBarEditorRemoveButtonSubject() {
    return this.navbarShowEditorRemoveButtonChange;
  }
}
