import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {combineLatest, map, Observable, Subject, Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectAuthenticatedUserBlogsIds,
  selectAuthenticatedUserBlogSubscriptions,
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

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  userBlogIds$: Observable<BlogId[]>;
  selectedBlog$: Observable<BlogView>;
  selectedBlogPublications: Observable<BlogPost[]>;
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

  appMenuModalSubscription: Subscription;
  appSettingsModalSubscription: Subscription;

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
    this.appMenuModalSubscription.unsubscribe();
    this.appSettingsModalSubscription.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onNewPostClicked() {
    this.router.navigate(['/editor-page']);
  }

  onSearchInputEvent(inputEvent: string) {
    console.log(inputEvent)
  }

  private fetchDataFromStore() {
    this.store.dispatch(getPosts({status: 'Published'}));
    this.userBlogIds$ = this.store.select(selectAuthenticatedUserBlogsIds);
    this.selectedBlogPublications = this.store.select(selectSelectedBlogPosts);
    this.selectedBlog$ = this.store.select(selectSelectedBlog);
    this.isLoading$ = this.store.select(selectIsBlogLoading);
    this.isOwner$ = this.store.select(selectIsBlogOwner)



    this.isLoaded$ = combineLatest([
      this.selectedBlog$, this.selectedBlogPublications, this.isLoading$
      ]).pipe(
        map(([userBlog, publications, isLoadingAnything]) => {
          this.isSubscriber$ = this.store.select(selectIsSubscriber(userBlog.id))
          return !!userBlog  && !!publications && !isLoadingAnything;
        })
    )


    const subs$ = this.store.select(selectAuthenticatedUserBlogSubscriptions)
      .pipe(take(1))
      .subscribe(subs => {

        this.selectedBlog$.pipe(take(1)).subscribe(blog => {
          console.log(`Selected blog ${blog.id.id},${blog.id.username}`)
          subs.forEach(s => {
            console.log(`Subscriptions ${s.id.subscription.id},${s.id.subscription.username}`)

            // console.log(`Are equal? ${ blog.id.id === s.id.subscription.id && blog.id.username === s.id.subscription.username }`)
          })
        })
      })

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
    this.store.dispatch(getPosts({categoryId: category.id}))
  }

  onStatusSelected(status: string) {
    this.store.dispatch(getPosts({status}))
  }

  categoryFormatter = (category: Category) => category.name
}
