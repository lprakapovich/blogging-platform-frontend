import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showAppMenuModalChange = new Subject<boolean>();
  private showAppSettingsModalChange = new Subject<boolean>();

  private showDeleteBlogModalChange = new Subject<boolean>();
  private showDeleteCategoryModalChange = new Subject<boolean>();
  private showLogoutModalChange = new Subject<boolean>();

  showAppMenuModal(show: boolean) {
    this.showAppMenuModalChange.next(show);
  }

  showAppSettingsModal(show: boolean) {
    this.showAppSettingsModalChange.next(show)
  }

  showLogoutModal(show: boolean) {
    this.showLogoutModalChange.next(show);
  }

  showDeleteBlogModal(show: boolean) {
    this.showDeleteBlogModalChange.next(show);
  }

  showDeleteCategoryModal(show: boolean) {
    this.showDeleteCategoryModalChange.next(show);
  }

  getAppMenuModalSub() {
    return this.showAppMenuModalChange;
  }

  getAppSettingsModalSub() {
    return this.showAppSettingsModalChange;
  }

  getLogoutModalSub() {
    return this.showLogoutModalChange;
  }

  getDeleteBlogModalSub() {
    return this.showDeleteBlogModalChange;
  }

  getDeleteCategoryModalSub() {
    return this.showDeleteCategoryModalChange;
  }
}
