import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarService} from "../../../services/ui/navbar.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectAuthenticatedUserBlog,
  selectIsBlogLoading,
  selectUserBlogIds
} from "../../../store/selectors/blog.selectors";
import {AppMenuModalComponent} from "../../ui-elements/app-menu-modal/app-menu-modal.component";
import {BlogView} from "../../../models/BlogView";
import {BlogSettingsModalComponent} from "../blog-settings-modal/blog-settings-modal.component";
import {ModalService} from "../../../services/ui/modal.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  userBlogIds$: Observable<string[]>;
  userBlog$: Observable<BlogView>;
  isLoadingBlogData$: Observable<boolean>;

  @ViewChild('appMenuModal')
  appMenuModal: AppMenuModalComponent;

  @ViewChild('appBlogSettingsModal')
  appBlogSettingsModal: BlogSettingsModalComponent;

  showAppMenuModal: boolean;
  showAppBlogSettingsModal: boolean;

  appMenuModalSubscription: Subscription;
  appSettingsModalSubscription: Subscription;

  constructor(private store: Store,
              private router: Router,
              private navbarService: NavbarService,
              private modalService: ModalService) {

    this.showAppMenuModal = false;
    this.showAppBlogSettingsModal = false;
  }

  ngOnInit(): void {
    this.init();
    this.fetchDataFromStore();
    this.subscribeToModalChanges();
  }

  ngOnDestroy() {
    this.appMenuModalSubscription.unsubscribe();
    this.appSettingsModalSubscription.unsubscribe();
  }

  onNewPostClicked() {
    this.router.navigate(['/editor-page']);
  }

  onSearchInputEvent(inputEvent: string) {
    console.log(inputEvent)
  }

  private fetchDataFromStore() {
    this.userBlogIds$ = this.store.select(selectUserBlogIds);
    this.userBlog$ = this.store.select(selectAuthenticatedUserBlog)
    this.isLoadingBlogData$ = this.store.select(selectIsBlogLoading);
  }

  onUserBlogSelectedEvent($event: string) {
    console.log(`selected ${$event}`)
  }

  onSettingsModalClosed() {
    this.modalService.showAppSettingsModal(false)
  }

  onSettingsSelectedEvent() {
    this.modalService.showAppMenuModal(false);
    this.modalService.showAppSettingsModal(true);
  }

  private subscribeToModalChanges() {
    this.appMenuModalSubscription = this.modalService.getAppMenuModalSubject()
      .subscribe(show =>
        this.showAppMenuModal = show
      );
    this.appSettingsModalSubscription = this.modalService.getAppSettingsModalSubject()
      .subscribe(show =>
        this.showAppBlogSettingsModal = show
      )
  }

  private init() {
    this.navbarService.setBlogTemplate();
  }
}
