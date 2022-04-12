import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {combineLatest, Observable, Subject, takeUntil} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectEditedPost, selectIsPostLoading} from "../../../store/selectors/post.selectors";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  @ViewChild('title') title: ElementRef;

  @Output() inputEventEmitter = new EventEmitter();

  unsubscribe$ = new Subject<void>();

  editedPost$: Observable<BlogPost | null>;
  isLoading$: Observable<boolean>;
  isModified$: Observable<boolean>;

  // todo how to set it ??
  modifiedTitleInput: string = '';
  modifiedContentInput: string = '';

  public constructor(private store: Store) {
  }

  ngOnInit() {
    this.editedPost$ = this.store.select(selectEditedPost);
    this.isLoading$ = this.store.select(selectIsPostLoading);

    combineLatest([this.editedPost$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([post]) => {
        this.modifiedContentInput = post?.content ?? '';
        this.modifiedTitleInput = post?.title ?? '';
      })
  }

  onTitleEnterKeyDown() {
    this.title.nativeElement.blur();
    this.content.nativeElement.innerHTML.trimStart();
    this.content.nativeElement.focus();
    this.autoSaveInput()
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
}
