import {Component, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {combineLatest, Observable, Subject, takeUntil} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectIsAuthenticatedUsersPost, selectSelectedPost} from "../../../store/selectors/post.selectors";
import {BlogId} from "../../../models/Blog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  unsubscribe$ = new Subject<void>();

  post$: Observable<BlogPost | null>;
  isAuthenticatedUsersPost$: Observable<boolean>;

  constructor(private store: Store,
              private router: Router,
              private navbarService: NavbarTemplateService) {
  }

  ngOnInit(): void {
    this.navbarService.setPostPreviewTemplate();
    this.post$ = this.store.select(selectSelectedPost);
    this.isAuthenticatedUsersPost$ = this.store.select(selectIsAuthenticatedUsersPost);

    combineLatest([this.isAuthenticatedUsersPost$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([isAuthenticatedUserPost]) => {
        console.log(isAuthenticatedUserPost)
        this.navbarService.adjustEditButton(isAuthenticatedUserPost)
      })
  }

  onBlogNameClickedEvent(blogId: BlogId) {
    this.router.navigate([`/blog/@${blogId.id}`])
  }
}
