import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarTemplateService {

  public static BLOG_TEMPLATE = 'blog';
  public static EDITOR_TEMPLATE = 'editor';
  public static DEFAULT_TEMPLATE = 'default';

  private navbarTemplate = NavbarTemplateService.DEFAULT_TEMPLATE;

  private navbarTemplateChange: Subject<string> = new Subject<string>();
  private navbarShowEditorRemoveButtonChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.navbarTemplateChange.subscribe(value => {
      this.navbarTemplate = value
    });
  }

  setBlogTemplate() {
    this.navbarTemplateChange.next(NavbarTemplateService.BLOG_TEMPLATE);
  }

  setEditorTemplate() {
    this.navbarTemplateChange.next(NavbarTemplateService.EDITOR_TEMPLATE);
  }

  setDefaultTemplate() {
    this.navbarTemplateChange.next(NavbarTemplateService.DEFAULT_TEMPLATE);
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
