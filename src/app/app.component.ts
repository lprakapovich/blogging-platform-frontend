import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {BlogId} from "./models/Blog";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NavbarTemplateService} from "./services/ui/navbar-template.service";
import {ModalService} from "./services/ui/modal.service";
import {AppMenuModalComponent} from "./components/navigation/app-menu-modal/app-menu-modal.component";
import {BlogSettingsModalComponent} from "./components/blog/blog-settings-modal/blog-settings-modal.component";
import {deleteBlog, getBlogDetailsAndRedirect} from "./store/actions/blog.actions";
import {selectPrincipalActiveBlogId, selectPrincipalManagedBlogIds} from "./store/selectors/blog.selectors";
import {PageService} from "./services/ui/page.service";
import {resetPage} from "./store/actions/page.actions";
import {logout} from "./store/actions/auth.actions";
import {Category} from "./models/Category";
import {deleteCategory} from "./store/actions/category.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  @ViewChild('appMenuModal')
  appMenuModal: AppMenuModalComponent;

  @ViewChild('appBlogSettingsModal')
  appBlogSettingsModal: BlogSettingsModalComponent;

  showAppMenuModal: boolean;
  showAppBlogSettingsModal: boolean;

  showConfirmLogoutModal: boolean;
  showConfirmBlogDeletionModal: boolean;
  showConfirmCategoryDeletionModal: boolean;

  userBlogIds$: Observable<BlogId[]>;
  activeBlogId$: Observable<BlogId>;

  categoryToDelete: Category | null;

  constructor(private store: Store,
              private router: Router,
              private navbarService: NavbarTemplateService,
              private modalService: ModalService,
              private pageService: PageService) {
  }

  ngOnInit(): void {
    this.fetchDataFromStore();
    this.subscribeToModalChanges();
  }

  ngOnDestroy() {
    this.categoryToDelete = null;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private fetchDataFromStore() {
    this.userBlogIds$ = this.store.select(selectPrincipalManagedBlogIds);
    this.activeBlogId$ = this.store.select(selectPrincipalActiveBlogId);
  }

  private subscribeToModalChanges() {
    this.modalService.getAppMenuModalSub()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showAppMenuModal = show);

    this.modalService.getAppSettingsModalSub()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showAppBlogSettingsModal = show);

    this.modalService.getLogoutModalSub()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showConfirmLogoutModal = show);

    this.modalService.getDeleteBlogModalSub()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showConfirmBlogDeletionModal = show);

    this.modalService.getDeleteCategoryModalSub()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showConfirmCategoryDeletionModal = show);
  }

  onUserBlogSelectedEvent(blogId: BlogId) {
    this.showAppMenuModal = false;
    this.store.dispatch(resetPage())
    this.store.dispatch(getBlogDetailsAndRedirect({ blogId }))
  }

  onSettingsSelectedEvent() {
    this.modalService.showAppMenuModal(false);
    this.modalService.showAppSettingsModal(true);
  }

  onSettingsModalClosed() {
    this.modalService.showAppSettingsModal(false)
  }

  onScrollDown() {
    this.pageService.incrementPage();
  }

  onLogout() {
    this.modalService.showLogoutModal(true);
  }

  onLogoutConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.modalService.showAppSettingsModal(false);
      this.store.dispatch(logout());
    }
    this.modalService.showLogoutModal(false)
  }

  onDeleteBlog() {
    this.modalService.showDeleteBlogModal(true);
  }

  onDeleteBlogConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.store.dispatch(deleteBlog())
    }
    this.showConfirmBlogDeletionModal = false;
  }

  onDeleteCategory(category: Category) {
    this.categoryToDelete = category;
    this.modalService.showDeleteCategoryModal(true);
  }

  onDeleteCategoryConfirmed(confirmed: boolean) {
    if (confirmed && this.categoryToDelete) {
      this.store.dispatch(deleteCategory( { id: this.categoryToDelete.id}))
    }
    this.modalService.showDeleteCategoryModal(false);
  }
}
