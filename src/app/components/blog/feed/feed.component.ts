import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavbarService} from "../../../services/ui/navbar.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsPostLoading, selectPostsFromSubscriptions} from "../../../store/selectors/post.selectors";
import {getPostsFromSubscriptions, setSelectedPost, resetSelectedPost} from "../../../store/actions/post.actions";
import {AppMenuModalComponent} from "../../ui-elements/app-menu-modal/app-menu-modal.component";
import {selectAuthenticatedUserBlog, selectUserBlogIds} from "../../../store/selectors/blog.selectors";
import {getBlogDetailsAndRedirect} from "../../../store/actions/blog.actions";
import {BlogSettingsModalComponent} from "../blog-settings-modal/blog-settings-modal.component";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogView} from "../../../models/BlogView";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {

  isLoading$: Observable<boolean>;
  posts$: Observable<BlogPost[]>;
  userBlogIds$: Observable<string[]>;
  userBlog$: Observable<BlogView>;

  @ViewChild('appMenuModal')
  appMenuModal: AppMenuModalComponent;

  @ViewChild('appBlogSettingsModal')
  appBlogSettingsModal: BlogSettingsModalComponent;

  showPostPreview: boolean;
  showAppMenuModal: boolean;
  showAppBlogSettingsModal: boolean;

  constructor(private store: Store,
              private navbarService: NavbarService,
              private modalService: ModalService,
              private router: Router) {

    this.showPostPreview = false;
    this.showAppMenuModal = false;
    this.showAppBlogSettingsModal = false;
    this.navbarService.setBlogTemplate()
  }

  private fetchDataFromStore() {

  }

  ngOnInit(): void {
    this.userBlogIds$ = this.store.select(selectUserBlogIds);
    this.userBlog$ = this.store.select(selectAuthenticatedUserBlog);
    this.isLoading$ = this.store.select(selectIsPostLoading);
    this.posts$ = this.store.select(selectPostsFromSubscriptions);
    this.store.dispatch(getPostsFromSubscriptions());

    this.isLoading$.subscribe(() => {
      this.resizeAllGridItems()
    })

    this.modalService.getAppMenuModalSubject()
      .subscribe(show => this.showAppMenuModal = show)

    this.modalService.getAppSettingsModalSubject()
      .subscribe(show => this.showAppBlogSettingsModal = show)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeAllGridItems();
  }

  ngAfterViewInit(): void {
    this.resizeAllGridItems();
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
    let allItems = document.getElementsByClassName("feed-grid-item");
    for(let x=0; x< allItems.length; x++){
      this.resizeGridItem(allItems[x]);
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

  onUserBlogSelectedEvent(blogId: string) {
    this.showAppMenuModal = false;
    this.store.dispatch(getBlogDetailsAndRedirect({blogId}))
  }

  onSettingsSelectedEvent() {
    this.modalService.showAppMenuModal(false);
    this.modalService.showAppSettingsModal(true);
  }

  onSettingsModalClosed() {
    this.modalService.showAppSettingsModal(false);
  }
}
