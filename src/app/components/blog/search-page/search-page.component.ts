import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Blog, BlogId} from "../../../models/Blog";
import {BlogPost} from "../../../models/BlogPost";
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {getBlogDetailsAndRedirect, getSearchedBlogs} from "../../../store/actions/blog.actions";
import {selectSearchedBlogs} from "../../../store/selectors/blog.selectors";
import {selectPostsBySearchCriteria} from "../../../store/selectors/post.selectors";
import {getPostsBySearchCriteria} from "../../../store/actions/post.actions";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

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
              private navbarService: NavbarTemplateService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .pipe(take(1))
      .subscribe(params => {
        this.searchInput = params['search'];
        this.store.dispatch(getSearchedBlogs({payload: this.searchInput}))
        this.store.dispatch(getPostsBySearchCriteria({title: this.searchInput}))
      });

    this.navbarService.setBlogTemplate();
    this.blogsSearchResult$ = this.store.select(selectSearchedBlogs);
    this.postsSearchResult$ = this.store.select(selectPostsBySearchCriteria);
  }

  onEnterPressed(searchCriteria: string) {
    this.store.dispatch(getSearchedBlogs({payload: searchCriteria}))
    this.store.dispatch(getPostsBySearchCriteria({title: searchCriteria}))
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

  onBlogSelected(blogId: BlogId) {
    this.store.dispatch(getBlogDetailsAndRedirect({ blogId }))
  }
}
