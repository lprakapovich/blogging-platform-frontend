import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsPostGetLoading, selectPostsFromSubscriptions} from "../../../store/selectors/post.selectors";
import {getPostsFromSubscriptions, resetSelectedPost, setSelectedPost} from "../../../store/actions/post.actions";
import {selectPrincipalActiveBlog} from "../../../store/selectors/blog.selectors";
import {BlogActionTypes} from "../../../store/actions/blog.actions";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogView} from "../../../models/BlogView";
import {BlogId} from "../../../models/Blog";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit, AfterViewInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  isGetLoading$: Observable<boolean>;
  posts$: Observable<BlogPost[]>;
  userBlogIds$: Observable<BlogId[]>;
  userBlog$: Observable<BlogView>;

  showPostPreview: boolean;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeAllGridItems();
  }

  constructor(private store: Store,
              private actions$: Actions,
              private navbarService: NavbarTemplateService,
              private modalService: ModalService,
              private router: Router) {

    this.showPostPreview = false;
  }

  ngOnInit(): void {
    this.fetchDataFromStore()
    this.subscribeToStoreChanges();
    this.navbarService.setBlogTemplate()
  }

  ngAfterViewInit(): void {
     this.resizeAllGridItems();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private fetchDataFromStore() {
    this.store.dispatch(getPostsFromSubscriptions());

    this.userBlog$ = this.store.select(selectPrincipalActiveBlog);
    this.isGetLoading$ = this.store.select(selectIsPostGetLoading);
    this.posts$ = this.store.select(selectPostsFromSubscriptions);

    this.actions$.pipe(
      takeUntil(this.unsubscribe$),
      ofType(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS)
    ).subscribe(() => this.store.dispatch(getPostsFromSubscriptions()))
  }

  private subscribeToStoreChanges() {
    this.isGetLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.resizeAllGridItems());
  }

  onEnterPressed($event: any) {
    this.router.navigate(['/search'],  { queryParams: { search: $event } })
  }

  resizeGridItem(item: any) {
    const grid = document.getElementsByClassName("feed-grid")[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.feed-grid-item-content')
      .getBoundingClientRect().height +rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span "+ rowSpan;
  }

   resizeAllGridItems(){
    let gridItems = document.getElementsByClassName("feed-grid-item");
    for (let gridItem of Array.of(gridItems)) {
      this.resizeGridItem(gridItem)
    }
  }

  openPostPreview(post: BlogPost) {
    this.store.dispatch(setSelectedPost({post}))
    if (!this.showPostPreview) {
      this.showPostPreview = true;
    }
  }

  closePostPreview() {
    this.store.dispatch(resetSelectedPost())
    this.showPostPreview = false;
  }
}
