import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  searchInput: string = '';

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
}
