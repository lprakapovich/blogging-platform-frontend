import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Blog, BlogId} from "../../../models/Blog";
import {BlogPost} from "../../../models/BlogPost";
import {NavbarService} from "../../../services/navbar.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getBlogsBySearchCriteria} from "../../../store/actions/blog.actions";
import {selectBlogsBySearchCriteria} from "../../../store/selectors/blog.selectors";
import {selectPostsBySearchCriteria} from "../../../store/selectors/post.selectors";
import {getPostsByTitle} from "../../../store/actions/post.actions";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  blogsSearchResult$: Observable<Blog[]>;
  postsSearchResult$: Observable<BlogPost[]>;

  searchInput: string = '';
  blogSearchResultLimit: number = 2;
  postSearchResultLimit: number = 2;

  blogSearchResultHidden = false;
  postSearchResultHidden = false;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchInput = params['search'];
        this.store.dispatch(getBlogsBySearchCriteria({payload: this.searchInput}))
        this.store.dispatch(getPostsByTitle({title: this.searchInput}))
      });

    this.navbarService.setBlogTemplate();
    this.blogsSearchResult$ = this.store.select(selectBlogsBySearchCriteria);
    this.postsSearchResult$ = this.store.select(selectPostsBySearchCriteria);
  }

  onEnterPressed(searchCriteria: string) {
    this.store.dispatch(getBlogsBySearchCriteria({payload: searchCriteria}))
    this.store.dispatch(getPostsByTitle({title: searchCriteria}))
  }

  onMoreBlogsClicked() {
    this.blogSearchResultLimit = 0;
  }

  onMorePostsClicked() {
    this.postSearchResultLimit = 0;
  }

  showBlogAndPostSearchResult() {
    this.postSearchResultHidden = false;
    this.blogSearchResultHidden = false;
  }

  hidePostSearchResult() {
    this.postSearchResultHidden = true;
    this.blogSearchResultHidden = false;
  }

  hideBlogSearchResult() {
    this.blogSearchResultHidden = true;
    this.postSearchResultHidden = false;
  }

  onBlogSelected(id: BlogId) {
    console.log(`Selected blog ${id.id},${id.username}`)
  }
}
