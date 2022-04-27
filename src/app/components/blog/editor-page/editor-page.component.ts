import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {EditorService} from "../../../services/ui/editor.service";
import {Observable, Subject, take, takeUntil, withLatestFrom} from "rxjs";
import {EditorComponent} from "../editor/editor.component";
import {Status} from "../../../models/Status";
import {createPost, resetEditedPost, updatePost} from "../../../store/actions/post.actions";
import {Store} from "@ngrx/store";
import {Category} from "../../../models/Category";
import {selectActiveBlogCategories} from "../../../store/selectors/blog.selectors";
import {BlogPostSettingsModalComponent} from "../blog-post-settings-modal/blog-post-settings-modal.component";
import {
  selectEditedPost,
  selectIsEditableMode,
  selectIsPostCreateLoading,
  selectIsPostUpdateLoading
} from "../../../store/selectors/post.selectors";
import {Actions} from "@ngrx/effects";
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit, OnDestroy {

  @ViewChild('editorComponent') editorComponent: EditorComponent;
  @ViewChild('postSettingsComponent') postSettingsComponent: BlogPostSettingsModalComponent;

  private unsubscribe$ = new Subject<void>();

  blogCategories$: Observable<Category[]>;
  editedPost$: Observable<BlogPost | null>;
  isPostCreateLoading$: Observable<boolean>;
  isPostUpdateLoading$: Observable<boolean>;

  isEditableMode$: Observable<boolean>;

  isContentMissing: boolean;
  isTitleMissing: boolean;
  showPostSettingsModal: boolean;
  showConfirmDialogModal: boolean;

  constructor(
    private store: Store,
    private actions$: Actions,
    private navbarTemplateService: NavbarTemplateService,
    private editorService: EditorService
  ) {
    this.showPostSettingsModal = false;
    this.showConfirmDialogModal = false;
  }

  ngOnInit() {
    this.navbarTemplateService.setEditorTemplate();

    this.blogCategories$ = this.store.select(selectActiveBlogCategories);
    this.isPostCreateLoading$ = this.store.select(selectIsPostCreateLoading);
    this.isPostUpdateLoading$ = this.store.select(selectIsPostUpdateLoading);
    this.editedPost$ = this.store.select(selectEditedPost);
    this.isEditableMode$ = this.store.select(selectIsEditableMode);

    this.editorService.getPublishEventChanged()
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.onShowPostSettingsModal()
      })

    this.editorService.getMissingContentOrTitleErrorChanged()
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(({isContentMissing, isTitleMissing}) => {
        this.isContentMissing = isContentMissing;
        this.isTitleMissing = isTitleMissing;
    })
  }

  ngOnDestroy() {
    this.store.dispatch(resetEditedPost());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private onShowPostSettingsModal() {
    this.editorComponent.autoSaveInput();

    let postTitleText = this.editorComponent.modifiedTitleInputText.trim();
    let postContentText = this.editorComponent.modifiedContentInputText.trim();
    let isInputValid = !!postTitleText && !!postContentText;

    if (isInputValid) {
      this.showPostSettingsModal = true;
    } else {
      this.showMissingDataErrorMessage(postTitleText, postContentText);
    }
  }

  private showMissingDataErrorMessage(title: string, content: string) {
    this.editorService.onMissingContentOrTitleErrorChanged(!content, !title);
  }

  hideErrorMessages() {
    this.editorService.onMissingContentOrTitleErrorChanged(false, false)
  }

  onClosePostSettingsModal() {
    this.showPostSettingsModal = false;
  }

  onPublishEvent($event: { selectedStatus: Status; selectedCategory?: Category }) {

    let trimmedTitle = this.editorComponent.modifiedTitleInputText.trim();
    let trimmedContent = this.editorComponent.modifiedContentInput.trim();

    let baseData = {
      title: trimmedTitle,
      content: trimmedContent,
      status: $event.selectedStatus,
    }

    let postData = !!$event.selectedCategory ? {
      ...baseData,
      category: $event.selectedCategory
    } : baseData;

    this.editedPost$.pipe(
      withLatestFrom(this.isEditableMode$),
      take(1))
      .subscribe(([post, isEditableMode]) => {
        if (isEditableMode && !!post) {
          this.store.dispatch(updatePost( { postId: post.id, updatePostData: postData}))
        } else {
          this.store.dispatch(createPost({ createPostData: postData }))
        }
      })
  }
}
