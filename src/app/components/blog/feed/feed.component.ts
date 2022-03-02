import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  loading: boolean = false;

  constructor(private navbarService: NavbarService,
              private router: Router) {
    this.navbarService.setBlogTemplate()
  }

  ngOnInit(): void {
  }

  onSearchInputEvent($event: string) {
    // console.log($event)
  }

  onEnterPressed($event: any) {
    this.router.navigate(['/search'],  { queryParams: { search: $event } })
    // enter
  }
}
