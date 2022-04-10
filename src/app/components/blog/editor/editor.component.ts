import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {EditorService} from "../../../services/ui/editor.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectIsModified, selectIsPostLoading, selectSelectedPost} from "../../../store/selectors/post.selectors";
import {CreatePostData} from "../../../models/data/post/CreatePostData";
import {Status} from "../../../models/Status";
import {createPost} from "../../../store/actions/post.actions";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnDestroy {

  @ViewChild('content') content: ElementRef;
  @ViewChild('title') title: ElementRef;

  private unsubscribe$ = new Subject<void>();

  selectedPost$: Observable<BlogPost | null>;
  isLoading$: Observable<boolean>;
  isModified$: Observable<boolean>;

  isTitleMissing: boolean;
  isContentMissing: boolean;

  modifiedTitleInput: string = '';
  modifiedContentInput: any = '';

  public constructor(private store: Store,
                     private navbarService: NavbarTemplateService,
                     private editorService: EditorService) {

    editorService.getPublishEventChanged()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        console.log('event from editorService.getPublishSubject()')
        this.onPublishEventTriggered()
      })

    editorService.getDeleteEventChanged()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.onDeleteEventTriggered())

    this.selectedPost$ = this.store.select(selectSelectedPost);
    this.isLoading$ = this.store.select(selectIsPostLoading);
    this.isModified$ = this.store.select(selectIsModified(this.modifiedTitleInput, this.modifiedContentInput));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private onDeleteEventTriggered() {

  }

   onPublishEventTriggered() {
    this.autoSaveInput();

    let title = this.modifiedTitleInput.trim();
    let content = this.modifiedContentInput.trim();
    let isInputValid = !!content && !!title;

    if (isInputValid) {
      const createPostData: CreatePostData = {
        title: title,
        content: content,
        status: Status.Published.toString(),
      }
      this.store.dispatch(createPost({createPostData}))
    } else {
      this.showMissingDataErrorMessage();
    }
  }

  onTitleEnterKeyDown() {
    this.title.nativeElement.blur();
    this.content.nativeElement.innerHTML.trimStart();
    this.content.nativeElement.focus();
    this.autoSaveInput();
  }

  onTitleFocusOut() {
    this.autoSaveInput();
  }

  onContentFocusOut() {
    this.autoSaveInput();
  }

  autoSaveInput() {
    this.modifiedTitleInput = this.title.nativeElement.innerText;
    this.modifiedContentInput = this.content.nativeElement.innerHTML;
  }

  hideErrorMessages() {
    this.editorService.onMissingContentOrTitleErrorChanged(false, false)
  }

  private showMissingDataErrorMessage() {
    this.editorService.onMissingContentOrTitleErrorChanged(!this.modifiedContentInput, !this.modifiedTitleInput);
  }
}
