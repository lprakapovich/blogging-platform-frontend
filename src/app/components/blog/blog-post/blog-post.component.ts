import {Component, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Observable} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectSelectedPost} from "../../../store/selectors/post.selectors";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  post$: Observable<BlogPost | null>;

  constructor(private store: Store,
              private navbarService: NavbarTemplateService) {
  }

  ngOnInit(): void {
    this.navbarService.setBlogTemplate();
    this.post$ = this.store.select(selectSelectedPost);
  }
}
