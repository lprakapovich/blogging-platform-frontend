import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {EditorService} from "../../../services/ui/editor.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {EditorComponent} from "../editor/editor.component";
import {CreatePostData} from "../../../models/data/post/CreatePostData";
import {Status} from "../../../models/Status";
import {createPost} from "../../../store/actions/post.actions";
import {Store} from "@ngrx/store";
import {Category} from "../../../models/Category";
import {selectAuthenticatedUserBlogCategories} from "../../../store/selectors/blog.selectors";
import {BlogPostSettingsModalComponent} from "../blog-post-settings-modal/blog-post-settings-modal.component";
import {selectIsPostLoading} from "../../../store/selectors/post.selectors";
import {Actions, ofType} from "@ngrx/effects";
import {BlogActionTypes} from "../../../store/actions/blog.actions";

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
  isPostLoading$: Observable<boolean>;

  isContentMissing: boolean;
  isTitleMissing: boolean;
  postContent: any;
  postTitle: any;

  showPostSettingsModal: boolean;

  constructor(
    private store: Store,
    private actions$: Actions,
    private navbarTemplateService: NavbarTemplateService,
    private editorService: EditorService
  ) {
    this.showPostSettingsModal = false;
  }

  ngOnInit() {
    this.navbarTemplateService.setEditorTemplate();

    this.blogCategories$ = this.store.select(selectAuthenticatedUserBlogCategories);
    this.isPostLoading$ = this.store.select(selectIsPostLoading);

    this.editorService.getPublishEventChanged()
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(() => {
        console.log('event from editorService.getPublishEventChanged()')
        this.onPublishEventTriggered()
      })

    this.editorService.getDeleteEventChanged()
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(() =>{
        console.log('event from editorService.getDeleteEventChanged()')
        this.onDeleteEventTriggered()
      })

    this.editorService.getMissingContentOrTitleErrorChanged()
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(({isContentMissing, isTitleMissing}) => {
        this.isContentMissing = isContentMissing;
        this.isTitleMissing = isTitleMissing;
    })

    this.actions$.pipe(
      ofType(
        BlogActionTypes.GET_BLOG_DETAILS_SUCCESS),
      takeUntil(this.unsubscribe$)
    ).subscribe((action: any) => {
      let blogId = action.blogId;
      console.log(`editor-page component from NgInit fetched blogId= ${JSON.stringify(blogId)}`)
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private onPublishEventTriggered() {
    this.editorComponent.autoSaveInput();
    this.postTitle = this.editorComponent.modifiedTitleInput.trim();
    this.postContent = this.editorComponent.modifiedContentInput.trim();
    let isInputValid = !!this.postTitle && !!this.postContent;

    if (isInputValid) {
      this.showPostSettingsModal = true;
    } else {
      this.showMissingDataErrorMessage();
    }
  }

  private onDeleteEventTriggered() {

  }

  private showMissingDataErrorMessage() {
    this.editorService.onMissingContentOrTitleErrorChanged(
      !this.editorComponent.modifiedContentInput,
      !this.editorComponent.modifiedTitleInput);
  }

  hideErrorMessages() {
    this.editorService.onMissingContentOrTitleErrorChanged(false, false)
  }

  onClosePostSettingsModal() {
    this.showPostSettingsModal = false;
  }

  onPublishEvent($event: { selectedStatus: Status; selectedCategory: Category }) {

    console.log(JSON.stringify($event.selectedStatus))
    console.log(JSON.stringify($event.selectedCategory))

    const createPostData: CreatePostData = {
      title: this.postTitle,
      content: this.postContent,
      status: $event.selectedStatus,
      category: $event.selectedCategory
    }
    this.store.dispatch(createPost({createPostData}))
  }
}
