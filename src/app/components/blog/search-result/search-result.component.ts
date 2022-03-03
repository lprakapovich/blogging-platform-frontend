import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../../models/Blog";
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  searchInput: string = '';
  blogSearchResultLimit: number = 2;
  postSearchResultLimit: number = 4;

  blogs: Blog[] = [
    {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr'},
    {id: '2lpa', name: 'Lizaveta Prakapovich 2', description: 'descr'},
    {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr'},
    {id: '2lpa', name: 'Lizaveta Prakapovich 2', description: 'descr'}];
  posts: BlogPost[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params)
        // Defaults to 0 if no query param provided.
        this.searchInput = params['search'];

      });
  }

  onEnterPressed($event: string) {

  }

  onSearchInputEvent($event: string) {

  }

  onMoreBlogsClicked() {
    this.blogSearchResultLimit = 0;
  }
}
