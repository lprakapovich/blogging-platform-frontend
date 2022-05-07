import {Component, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../../services/ui/navbar-template.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {BlogPost} from "../../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {
  selectIsPostDeleteLoading,
  selectIsPrincipalsPost,
  selectSelectedPost
} from "../../../../store/selectors/post.selectors";
import {BlogId} from "../../../../models/Blog";
import {Router} from "@angular/router";
import {EditorService} from "../../../../services/ui/editor.service";
import {deletePost, PostActionTypes, setEditedPost} from "../../../../store/actions/post.actions";
import {Actions, ofType} from "@ngrx/effects";
import {getBlogDetailsAndRedirect} from "../../../../store/actions/blog.actions";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.scss']
})
export class BlogPostPageComponent implements OnInit {

  unsubscribe$ = new Subject<void>();

  post$: Observable<BlogPost | null>;
  isPrincipalsPost$: Observable<boolean>;

  isPostDeleteLoading$: Observable<boolean>;
  showConfirmPostDeletionModal: boolean;

  constructor(private store: Store,
              private actions$: Actions,
              private router: Router,
              private navbarService: NavbarTemplateService,
              private editorService: EditorService) {
  }

  ngOnInit(): void {
    this.navbarService.setPostPreviewTemplate();
    this.post$ = this.store.select(selectSelectedPost);
    this.isPrincipalsPost$ = this.store.select(selectIsPrincipalsPost);
    this.isPostDeleteLoading$ = this.store.select(selectIsPostDeleteLoading);

    this.isPrincipalsPost$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticatedUserPost) => {
        this.navbarService.adjustEditButton(isAuthenticatedUserPost)
        this.navbarService.adjustRemoveButton(isAuthenticatedUserPost);
      })

   this.editorService.getDeleteEventChanged()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.showConfirmPostDeletionModal = true;
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

    this.actions$.pipe(
      ofType(
        PostActionTypes.DELETE_POST_SUCCESS,
        PostActionTypes.DELETE_POST_FAILURE
      ), takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.showConfirmPostDeletionModal = false;
    })
  }

  onBlogSelected(blogId: BlogId) {
    this.store.dispatch(getBlogDetailsAndRedirect({ blogId }))
  }

  onConfirmDialogEvent(confirmed: boolean) {
    if (confirmed) {
      this.store.dispatch(deletePost())
    } else {
      this.showConfirmPostDeletionModal = false;
    }
  }
}
