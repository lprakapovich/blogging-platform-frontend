import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectEditedPost} from "../../../store/selectors/post.selectors";

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
  isModified$: Observable<boolean>;

  modifiedTitleInputText: string = '';
  modifiedContentInputText: string = '';
  modifiedContentInput: any = '';

  public constructor(private store: Store) {
  }

  ngOnInit() {
    this.editedPost$ = this.store.select(selectEditedPost);

    this.editedPost$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((post) => {
        this.modifiedContentInput = post?.content ?? '';
        this.modifiedTitleInputText = post?.title ?? '';
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
    this.modifiedTitleInputText = this.title.nativeElement.innerText;
    this.modifiedContentInput = this.content.nativeElement.innerHTML;
    this.modifiedContentInputText = this.content.nativeElement.innerText;
  }
}
