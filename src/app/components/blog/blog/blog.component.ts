import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarService} from "../../../services/ui/navbar.service";
import {combineLatest, map, Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectIsBlogLoading,
  selectIsBlogOwner,
  selectSelectedBlog,
  selectUserBlogIds
} from "../../../store/selectors/blog.selectors";
import {AppMenuModalComponent} from "../../ui-elements/app-menu-modal/app-menu-modal.component";
import {BlogView} from "../../../models/BlogView";
import {BlogSettingsModalComponent} from "../blog-settings-modal/blog-settings-modal.component";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogPost} from "../../../models/BlogPost";
import {selectUserBlogPosts} from "../../../store/selectors/post.selectors";
import {getPosts} from "../../../store/actions/post.actions";
import {BlogId} from "../../../models/Blog";
import {getBlogDetailsAndRedirect} from "../../../store/actions/blog.actions";
import {Category} from "../../../models/Category";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  userBlogIds$: Observable<BlogId[]>;
  selectedBlog: Observable<BlogView>;
  selectedBlogPublications: Observable<BlogPost[]>;
  isLoading$: Observable<boolean>;

  isLoaded$: Observable<boolean>;
  isOwner$: Observable<boolean>;

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
    this.store.dispatch(getPosts({status: 'Published'}));
    this.userBlogIds$ = this.store.select(selectUserBlogIds);
    this.selectedBlogPublications = this.store.select(selectUserBlogPosts);
    this.selectedBlog = this.store.select(selectSelectedBlog);
    this.isLoading$ = this.store.select(selectIsBlogLoading);
    this.isOwner$ = this.store.select(selectIsBlogOwner)

    this.isLoaded$ = combineLatest([
      this.selectedBlog, this.selectedBlogPublications, this.isLoading$
      ]).pipe(
        map(([userBlogIsLoaded, userBlogPublicationsLoaded, isLoadingAnything]) =>
          !!userBlogIsLoaded  && !!userBlogPublicationsLoaded && !isLoadingAnything)
    )
  }

  onUserBlogSelectedEvent(blogId: BlogId) {
    this.showAppMenuModal = false;
    this.store.dispatch(getBlogDetailsAndRedirect({
      blogId: blogId.id,
      username: blogId.username
    }))
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

  onSubscribeCLicked() {
    console.log(`Subscribe!`)
  }

  onCategorySelected(category: any) {
    console.log(`Selected category id= ${category.id}, name= ${category.name}`)
  }

  categoryFormatter = (category: Category) => category.name
}
