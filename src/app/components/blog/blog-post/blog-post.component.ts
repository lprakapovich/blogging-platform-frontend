import {Component, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {combineLatest, Observable, Subject, takeUntil} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectIsAuthenticatedUsersPost, selectSelectedPost} from "../../../store/selectors/post.selectors";
import {BlogId} from "../../../models/Blog";
import {Router} from "@angular/router";
import {EditorService} from "../../../services/ui/editor.service";
import {PostActionTypes, setEditedPost} from "../../../store/actions/post.actions";
import {Actions, ofType} from "@ngrx/effects";

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
              private actions$: Actions,
              private router: Router,
              private navbarService: NavbarTemplateService,
              private editorService: EditorService) {
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

    this.editorService.getEditedPostChanged()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(() => {
      this.store.dispatch(setEditedPost())
    })

    this.actions$.pipe(
      ofType(
        PostActionTypes.SET_EDITED_POST_SUCCESS),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.router.navigate(['/editor'])
    })
  }

  onBlogNameClickedEvent(blogId: BlogId) {
    this.router.navigate([`/blog/@${blogId.id}`])
  }
}
