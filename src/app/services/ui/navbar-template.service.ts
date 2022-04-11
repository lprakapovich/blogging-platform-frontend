import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarTemplateService {

  // todo change to union or enum
  public static BLOG_TEMPLATE = 'blog';
  public static EDITOR_TEMPLATE = 'editor';
  public static DEFAULT_TEMPLATE = 'default';
  public static POST_PREVIEW = 'post-preview';

  private navbarTemplate = NavbarTemplateService.DEFAULT_TEMPLATE;

  private readonly templateChanged;
  private readonly showRemoveButtonChanged;
  private readonly showEditorButtonChanged;

  constructor() {

   this.templateChanged = new Subject<string>();
   this.showRemoveButtonChanged = new Subject<boolean>();
   this.showEditorButtonChanged = new Subject<boolean>();

    this.templateChanged.subscribe(value => {
      this.navbarTemplate = value
    });
  }

  setBlogTemplate() {
    this.templateChanged.next(NavbarTemplateService.BLOG_TEMPLATE);
  }

  setEditorTemplate() {
    this.templateChanged.next(NavbarTemplateService.EDITOR_TEMPLATE);
  }

  setDefaultTemplate() {
    this.templateChanged.next(NavbarTemplateService.DEFAULT_TEMPLATE);
  }

  setPostPreviewTemplate() {
    this.templateChanged.next(NavbarTemplateService.POST_PREVIEW);
  }

  adjustRemoveButton(show: boolean) {
    this.showRemoveButtonChanged.next(show);
  }

  adjustEditButton(show: boolean) {
    this.showEditorButtonChanged.next(show)
  }

  getTemplateChanged() {
    return this.templateChanged;
  }

  getShowRemoveButtonChanged() {
    return this.showRemoveButtonChanged;
  }

  getShowEditButtonChanged() {
    return this.showEditorButtonChanged;
  }
}
