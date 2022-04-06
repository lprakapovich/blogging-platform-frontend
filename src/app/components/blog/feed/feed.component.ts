import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavbarService} from "../../../services/ui/navbar.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsPostLoading, selectPostsFromSubscriptions} from "../../../store/selectors/post.selectors";
import {getPostsFromSubscriptions, resetSelectedPost, setSelectedPost} from "../../../store/actions/post.actions";
import {AppMenuModalComponent} from "../../ui-elements/app-menu-modal/app-menu-modal.component";
import {selectAuthenticatedUserBlog, selectUserBlogIds} from "../../../store/selectors/blog.selectors";
import {BlogActionTypes, getBlogDetailsAndRedirect} from "../../../store/actions/blog.actions";
import {BlogSettingsModalComponent} from "../blog-settings-modal/blog-settings-modal.component";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogView} from "../../../models/BlogView";
import {BlogId} from "../../../models/Blog";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading$: Observable<boolean>;
  posts$: Observable<BlogPost[]>;
  userBlogIds$: Observable<BlogId[]>;
  userBlog$: Observable<BlogView>;

  @ViewChild('appMenuModal')
  appMenuModal: AppMenuModalComponent;

  @ViewChild('appBlogSettingsModal')
  appBlogSettingsModal: BlogSettingsModalComponent;

  showPostPreview: boolean;
  showAppMenuModal: boolean;
  showAppBlogSettingsModal: boolean;

  resizeSubscription: Subscription;
  appMenuSubscription: Subscription;
  appSettingsSubscription: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeAllGridItems();
  }

  constructor(private store: Store,
              private actions$: Actions,
              private navbarService: NavbarService,
              private modalService: ModalService,
              private router: Router) {

    this.showPostPreview = false;
    this.showAppMenuModal = false;
    this.showAppBlogSettingsModal = false;
    this.navbarService.setBlogTemplate()
  }

  ngOnInit(): void {
    this.fetchDataFromStore()
    this.subscribeToStoreChanges();
  }

  ngAfterViewInit(): void {
     this.resizeAllGridItems();
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.appMenuSubscription.unsubscribe();
    this.appSettingsSubscription.unsubscribe();
  }

  private fetchDataFromStore() {
    this.userBlogIds$ = this.store.select(selectUserBlogIds);
    this.userBlog$ = this.store.select(selectAuthenticatedUserBlog);
    this.isLoading$ = this.store.select(selectIsPostLoading);
    this.posts$ = this.store.select(selectPostsFromSubscriptions);

    this.actions$.pipe(
      ofType(
        BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS)
    ).subscribe(() => this.store.dispatch(getPostsFromSubscriptions()))
  }

  private subscribeToStoreChanges() {
    this.resizeSubscription = this.isLoading$
      .subscribe(() => this.resizeAllGridItems());

    this.appMenuSubscription = this.modalService.getAppMenuModalSubject()
      .subscribe(show => this.showAppMenuModal = show)

    this.appSettingsSubscription = this.modalService.getAppSettingsModalSubject()
      .subscribe(show => this.showAppBlogSettingsModal = show)
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

  onUserBlogSelectedEvent(id: BlogId) {
    this.showAppMenuModal = false;
    this.store.dispatch(getBlogDetailsAndRedirect({
      blogId: id.id,
      username: id.username
    }))
  }

  onSettingsSelectedEvent() {
    this.modalService.showAppMenuModal(false);
    this.modalService.showAppSettingsModal(true);
  }

  onSettingsModalClosed() {
    this.modalService.showAppSettingsModal(false);
  }
}
