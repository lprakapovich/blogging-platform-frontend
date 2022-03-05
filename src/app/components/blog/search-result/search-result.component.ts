import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../../models/Blog";
import {BlogPost} from "../../../models/BlogPost";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, AfterViewInit {

  searchInput: string = '';
  blogSearchResultLimit: number = 2;
  postSearchResultLimit: number = 4;

  blogSearchResultHidden = false;
  postSearchResultHidden = false;

  blogs: Blog[] = [
    {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr'},
    {id: '2lpa', name: '', description: 'descr'},
    {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr'},
    {id: '2lpa', name: 'Lizaveta Prakapovich 2', description: 'descr'}];

  posts: BlogPost[] = [
    {blogId: 'lprakapoich', title: '1st day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '2nd day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '3rd day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '4th day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '5th day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '6th day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '7th day of the war', author: "", content: ""},
    {blogId: 'lprakapoich', title: '8th day of the war', author: "", content: ""}
  ];

  constructor(private route: ActivatedRoute,
              private elementRef: ElementRef,
              private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchInput = params['search'];
      });

    this.navbarService.setBlogTemplate();
  }

  ngAfterViewInit(): void {
    const blogs = this.elementRef.nativeElement.querySelectorAll('.blog-search-result-item-wrapper');
    Array.from(blogs).forEach((blog: any) => {
      const id = blog.id;
      console.log(id);
    })
  }

  onEnterPressed($event: string) {

  }

  onSearchInputEvent($event: string) {

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
}
