import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {combineLatest, Observable, Subject, take, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectIsBlogGetLoading,
  selectIsPrincipalBlogOwner,
  selectIsSubscriber,
  selectSelectedBlog
} from "../../../store/selectors/blog.selectors";
import {BlogView} from "../../../models/BlogView";
import {BlogPost} from "../../../models/BlogPost";
import {selectSelectedBlogPosts} from "../../../store/selectors/post.selectors";
import {getPosts} from "../../../store/actions/post.actions";
import {BlogId} from "../../../models/Blog";
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

  Draft = Status.Draft
  Scheduled = Status.Scheduled
  postStatuses = [this.Draft, this.Scheduled]

  constructor(private store: Store,
              private router: Router,
              private navbarService: NavbarTemplateService) {
  }

  ngOnInit(): void {
    this.init();
    this.fetchDataFromStore();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onNewPostClicked() {
    this.router.navigate(['/editor']);
  }

  onSearchInputEvent(inputEvent: string) {
    console.log(inputEvent)
  }

  private fetchDataFromStore() {

    this.getPublishedPosts()

    this.selectedBlogPublications$ = this.store.select(selectSelectedBlogPosts);
    this.selectedBlog$ = this.store.select(selectSelectedBlog);
    this.isLoading$ = this.store.select(selectIsBlogGetLoading);
    this.isOwner$ = this.store.select(selectIsPrincipalBlogOwner)

    this.selectedBlog$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userBlog => {
        this.isSubscriber$ = this.store.select(selectIsSubscriber(userBlog.id))
        this.getPublishedPosts();
      })
  }

  private init() {
    this.navbarService.setBlogTemplate();
  }

  onSubscribeClicked() {
    combineLatest([this.isSubscriber$, this.selectedBlog$])
      .pipe(take(1))
      .subscribe(([isSubscriber, {id}]) => {
       isSubscriber ?
         this.store.dispatch(deleteSubscription({blogId: id})) :
         this.store.dispatch(createSubscription({blogId: id}));
      })
  }

  onCategorySelected(category: Category) {
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
