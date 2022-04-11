import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BlogPost} from "../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectIsModified, selectIsPostLoading, selectSelectedPost} from "../../../store/selectors/post.selectors";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  @ViewChild('title') title: ElementRef;

  @Output() inputEventEmitter = new EventEmitter();

  selectedPost$: Observable<BlogPost | null>;
  isLoading$: Observable<boolean>;
  isModified$: Observable<boolean>;

  // todo how to set it ??
  modifiedTitleInput: string;
  modifiedContentInput: string;

  public constructor(private store: Store) {
  }

  ngOnInit() {
    this.selectedPost$ = this.store.select(selectSelectedPost);
    this.isLoading$ = this.store.select(selectIsPostLoading);
    this.isModified$ = this.store.select(selectIsModified(this.modifiedTitleInput, this.modifiedContentInput));
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
