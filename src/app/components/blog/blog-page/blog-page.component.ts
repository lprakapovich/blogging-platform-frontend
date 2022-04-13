import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {combineLatest, map, Observable, Subject, take, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectAuthenticatedUserBlogsIds,
  selectIsBlogLoading,
  selectIsBlogOwner,
  selectIsSubscriber,
  selectSelectedBlog
} from "../../../store/selectors/blog.selectors";
import {AppMenuModalComponent} from "../../ui-elements/app-menu-modal/app-menu-modal.component";
import {BlogView} from "../../../models/BlogView";
import {BlogSettingsModalComponent} from "../blog-settings-modal/blog-settings-modal.component";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogPost} from "../../../models/BlogPost";
import {selectSelectedBlogPosts} from "../../../store/selectors/post.selectors";
import {getPosts} from "../../../store/actions/post.actions";
import {BlogId} from "../../../models/Blog";
import {getBlogDetailsAndRedirect} from "../../../store/actions/blog.actions";
import {Category} from "../../../models/Category";
import {createSubscription, deleteSubscription} from "../../../store/actions/subscription.actions";
import {Status} from "../../../models/Status";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  userBlogIds$: Observable<BlogId[]>;
  selectedBlog$: Observable<BlogView>;
  selectedBlogPublications$: Observable<BlogPost[]>;
  isLoading$: Observable<boolean>;

  isLoaded$: Observable<boolean>;
  isOwner$: Observable<boolean>;
  isSubscriber$: Observable<boolean>;

  @ViewChild('appMenuModal')
  appMenuModal: AppMenuModalComponent;

  @ViewChild('appBlogSettingsModal')
  appBlogSettingsModal: BlogSettingsModalComponent;

  showAppMenuModal: boolean;
  showAppBlogSettingsModal: boolean;

  Draft = Status.Draft
  Scheduled = Status.Scheduled
  postStatuses = [this.Draft, this.Scheduled]

  constructor(private store: Store,
              private router: Router,
              private navbarService: NavbarTemplateService,
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onNewPostClicked() {
    console.log('on new post clicked')
    this.router.navigate(['/editor-page']);
  }

  onSearchInputEvent(inputEvent: string) {
    console.log(inputEvent)
  }

  private fetchDataFromStore() {

    this.store.dispatch(getPosts({status: Status.Published}));

    this.userBlogIds$ = this.store.select(selectAuthenticatedUserBlogsIds);
    this.selectedBlogPublications$ = this.store.select(selectSelectedBlogPosts);
    this.selectedBlog$ = this.store.select(selectSelectedBlog);
    this.isLoading$ = this.store.select(selectIsBlogLoading);
    this.isOwner$ = this.store.select(selectIsBlogOwner)

    this.isLoaded$ = combineLatest([
      this.selectedBlog$, this.selectedBlogPublications$, this.isLoading$
      ]).pipe(
        takeUntil(this.unsubscribe$),
        map(([userBlog, publications, isLoadingAnything]) => {
          this.isSubscriber$ = this.store.select(selectIsSubscriber(userBlog.id))
          return !!userBlog  && !!publications && !isLoadingAnything;
        })
    )
  }

  onUserBlogSelectedEvent(blogId: BlogId) {
    this.showAppMenuModal = false;
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

  private init() {
    this.navbarService.setBlogTemplate();
  }

  onSubscribeClicked() {
    combineLatest([
      this.isSubscriber$, this.selectedBlog$
    ]).pipe(take(1))
      .subscribe(([isSubscriber, {id}]) => {
       isSubscriber ? this.store.dispatch(deleteSubscription({blogId: id})) :
         this.store.dispatch(createSubscription({blogId: id}));
      })
  }

  onCategorySelected(category: Category) {
    // NOTE filtering by category is only done among published posts
    this.store.dispatch(getPosts({
      categoryId: category.id,
      status: Status.Published
    }))
  }

  onStatusSelected(status: Status) {
    this.store.dispatch(getPosts({status}))
  }

  categoryFormatter = (category: Category) => category.name

  statusFormatter = (status: Status) => {
    switch(status) {
      case Status.Draft:
        return 'Draft'
      case Status.Scheduled:
        return 'Scheduled'
      default:
        return 'Published'
    }
  }

  getPublishedPosts() {
    this.getPosts(Status.Published);
  }

  getDraftPosts() {
    this.getPosts(Status.Draft)
  }

  getPosts(status: Status) {
    this.store.dispatch(getPosts( {status }))
  }
}
