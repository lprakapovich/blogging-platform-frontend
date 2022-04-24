import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {BlogId} from "./models/Blog";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NavbarTemplateService} from "./services/ui/navbar-template.service";
import {ModalService} from "./services/ui/modal.service";
import {AppMenuModalComponent} from "./components/ui-elements/app-menu-modal/app-menu-modal.component";
import {BlogSettingsModalComponent} from "./components/blog/blog-settings-modal/blog-settings-modal.component";
import {getBlogDetailsAndRedirect} from "./store/actions/blog.actions";
import {selectPrincipalActiveBlogId, selectPrincipalManagedBlogIds} from "./store/selectors/blog.selectors";
import {PageService} from "./services/ui/page.service";
import {resetPage} from "./store/actions/page.actions";

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

  userBlogIds$: Observable<BlogId[]>;
  activeBlogId$: Observable<BlogId>;

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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onUserBlogSelectedEvent(blogId: BlogId) {
    this.showAppMenuModal = false;
    this.store.dispatch(resetPage())
    this.store.dispatch(getBlogDetailsAndRedirect({ blogId }))
  }

  onSettingsModalClosed() {
    this.modalService.showAppSettingsModal(false)
  }

  onSettingsSelectedEvent() {
    this.modalService.showAppMenuModal(false);
    this.modalService.showAppSettingsModal(true);
  }

  private subscribeToModalChanges() {
    this.modalService.getAppMenuModalSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show =>
        this.showAppMenuModal = show
      );

    this.modalService.getAppSettingsModalSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show =>
        this.showAppBlogSettingsModal = show
      )
  }

  private fetchDataFromStore() {
    this.userBlogIds$ = this.store.select(selectPrincipalManagedBlogIds);
    this.activeBlogId$ = this.store.select(selectPrincipalActiveBlogId);
  }

  onScrollDown() {
    this.pageService.incrementPage();
  }
}
