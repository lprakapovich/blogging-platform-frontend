import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsPostLoading, selectPostsFromSubscriptions} from "../../../store/selectors/post.selectors";
import {getPostsFromSubscriptions, setSelectedPost, unselectPost} from "../../../store/actions/post.actions";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {

  isLoading$: Observable<boolean>;
  posts$: Observable<BlogPost[]>;

  showPostPreview: boolean = false;

  constructor(private store: Store,
              private navbarService: NavbarService,
              private router: Router) {
    this.navbarService.setBlogTemplate()
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsPostLoading);
    this.posts$ = this.store.select(selectPostsFromSubscriptions);
    this.store.dispatch(getPostsFromSubscriptions());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
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
    this.store.dispatch(unselectPost())
    this.showPostPreview = false;
  }
}
