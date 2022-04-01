import {Component} from '@angular/core';
import {NavbarService} from "../../../services/ui/navbar.service";
import {Store} from "@ngrx/store";
import {ModalService} from "../../../services/ui/modal.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  template: string;
  showNavbarMenuModal: boolean;
  showRemoveButton: boolean;

  constructor(private store: Store,
              private navbarService: NavbarService,
              private modalService: ModalService) {

    this.template = NavbarService.DEFAULT_TEMPLATE;
    this.showRemoveButton = false;
    this.showNavbarMenuModal = false;

    navbarService.getNavbarTemplateChangeSubject().subscribe(template => {
      this.template = template;
    })

    navbarService.getNavbarEditorRemoveButtonSubject().subscribe(show => {
      this.showRemoveButton = show;
    })
  }

  onBlogNavbarComponentClicked(tabId: string) {
    if (this.template === NavbarService.BLOG_TEMPLATE) {
      this.showNavbarMenuModal = tabId == 'profile' ? !this.showNavbarMenuModal : false;
      this.modalService.showAppMenuModal(this.showNavbarMenuModal)
    }
  }

  // navigateToBlog() {
  //   this.store.select(selectAuthenticatedUserBlogId)
  //     .pipe(take(1))
  //     .subscribe(id => {
  //       this.router.navigate([`/blog/@${id}`])
  //     })
  // }
}

