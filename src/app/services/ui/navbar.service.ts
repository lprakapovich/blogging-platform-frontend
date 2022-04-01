import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public static BLOG_TEMPLATE = 'blog';
  public static EDITOR_TEMPLATE = 'editor';
  public static DEFAULT_TEMPLATE = 'default';

  private navbarTemplate = NavbarService.DEFAULT_TEMPLATE;

  private navbarTemplateChange: Subject<string> = new Subject<string>();
  private navbarShowEditorRemoveButtonChange: Subject<boolean> = new Subject<boolean>();
  private navbarUnselectChange: Subject<void> = new Subject<void>();

  constructor() {
    this.navbarTemplateChange.subscribe(value => {
      this.navbarTemplate = value
    });
  }

  setBlogTemplate() {
    this.navbarTemplateChange.next(NavbarService.BLOG_TEMPLATE);
  }

  setEditorTemplate() {
    this.navbarTemplateChange.next(NavbarService.EDITOR_TEMPLATE);
  }

  setDefaultTemplate() {
    this.navbarTemplateChange.next(NavbarService.DEFAULT_TEMPLATE);
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

  getNavbarEditorRemoveButtonSubject() {
    return this.navbarShowEditorRemoveButtonChange;
  }
}
