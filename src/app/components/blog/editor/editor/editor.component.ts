import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NavbarTemplateService} from "../../../../services/ui/navbar-template.service";
import {EditorService} from "../../../../services/ui/editor.service";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {BlogPost} from "../../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectIsModified, selectIsPostLoading, selectSelectedPost} from "../../../../store/selectors/post.selectors";
import {CreatePostData} from "../../../../models/data/post/CreatePostData";
import {Status} from "../../../../models/Status";
import {createPost} from "../../../../store/actions/post.actions";

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
    const createPostData: CreatePostData = {
      title: this.modifiedTitleInput,
      content: this.modifiedContentInput,
      status: Status.Published.toString(),
    }
    this.store.dispatch(createPost({createPostData}))
  }

  onTitleEnterKeyDown() {
    // console.log(`Title enter key down`)
    this.title.nativeElement.blur();
    this.content.nativeElement.innerHTML.trimStart();
    this.content.nativeElement.focus();
    this.autoSaveInput();
  }

  onTitleFocusOut() {
    // console.log(`Title focus lost`)
    this.autoSaveInput();
  }

  onContentEnterKeyDown() {
    // console.log(`Content enter key down`)
    // this.autoSaveInput();
  }

  onContentFocusOut() {
    // console.log(`Content focus lost`)
    this.autoSaveInput();
  }

  autoSaveInput() {
    this.modifiedTitleInput = this.title.nativeElement.innerText;
    this.modifiedContentInput = this.content.nativeElement.innerHTML;
    //
    // console.log(`Auto saved title: ${this.modifiedTitleInput}`)
    // console.log(`Auto saved content: ${this.modifiedContentInput}`)
  }
}
