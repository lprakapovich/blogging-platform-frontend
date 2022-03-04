import {AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../../models/Blog";
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, AfterViewInit {

  @ViewChildren('searchResultItemWrapper') searchResultItemWrappers!: QueryList<HTMLElement>;


  searchInput: string = '';
  blogSearchResultLimit: number = 2;
  postSearchResultLimit: number = 4;

  blogs: Blog[] = [
    {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr'},
    {id: '2lpa', name: '', description: 'descr'},
    {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr'},
    {id: '2lpa', name: 'Lizaveta Prakapovich 2', description: 'descr'}];

  posts: BlogPost[] = [
    {blogId: 'lprakapoich', title: '1st day of the war'},
    {blogId: 'lprakapoich', title: '2nd day of the war'},
    {blogId: 'lprakapoich', title: '3rd day of the war'},
    {blogId: 'lprakapoich', title: '4th day of the war'},
    {blogId: 'lprakapoich', title: '5th day of the war'},
    {blogId: 'lprakapoich', title: '6th day of the war'},
    {blogId: 'lprakapoich', title: '7th day of the war'},
    {blogId: 'lprakapoich', title: '8th day of the war'}
  ];

  constructor(private route: ActivatedRoute,
              private elementRef: ElementRef,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchInput = params['search'];
      });

    // console.log(((<HTMLElement>this.elementRef.nativeElement).querySelector('.search-result-item-wrapper')));
    // let blogs = document.querySelector('.search-result-item-wrapper');
    // console.log(this.blogs)
    // blogs.forEach((blog: any) => {
    //   let id = blog.id;
    //   let initials = this.elementRef.nativeElement.querySelector('.' + id + 'blog-name-search-result-item');
    //   console.log(initials)
    // })
  }

  ngAfterViewInit(): void {
    const blogs = this.elementRef.nativeElement.querySelectorAll('.search-result-item-wrapper');
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
}
