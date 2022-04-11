import {Component} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Store} from "@ngrx/store";
import {ModalService} from "../../../services/ui/modal.service";
import {EditorService} from "../../../services/ui/editor.service";
import {selectAuthenticatedUserBlogId} from "../../../store/selectors/blog.selectors";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  template: string;
  showNavbarMenuModal: boolean;
  showRemoveButton: boolean;
  showEditButton: boolean;

  constructor(private store: Store,
              private router: Router,
              private navbarTemplateService: NavbarTemplateService,
              private modalService: ModalService,
              private editorService: EditorService) {

    this.template = NavbarTemplateService.DEFAULT_TEMPLATE;
    this.showRemoveButton = false;
    this.showNavbarMenuModal = false;
    this.showEditButton = false;

    navbarTemplateService.getTemplateChanged().subscribe(template => {
      this.template = template;
    })

    navbarTemplateService.getShowRemoveButtonChanged().subscribe(show => {
      this.showRemoveButton = show;
    })

    navbarTemplateService.getShowEditButtonChanged().subscribe(show => {
      this.showEditButton = show;
    })
  }

  onBlogNavbarComponentClicked(tabId: string) {
    if (this.template === NavbarTemplateService.BLOG_TEMPLATE) {
      this.showNavbarMenuModal = tabId == 'profile' ? !this.showNavbarMenuModal : false;
      this.modalService.showAppMenuModal(this.showNavbarMenuModal)
    }
  }

  onBackClicked() {
    this.store.select(selectAuthenticatedUserBlogId)
      .pipe(take(1))
      .subscribe(blogId => {
        console.log(blogId.id)
        this.router.navigate([
          `/blog/@${blogId.id}`
        ])
      })
  }

  onDeleteClicked() {
    this.editorService.onDeletePostClicked();
  }

  onPublishClicked() {
    this.editorService.onPublishPostClicked();
  }
}

