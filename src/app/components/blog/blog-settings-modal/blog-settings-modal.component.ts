import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";
import {BlogView} from "../../../models/BlogView";
import {UpdateBlogData} from "../../../models/data/blog/UpdateBlogData";
import {updateBlog} from "../../../store/actions/blog.actions";
import {Observable, Subject, takeUntil} from "rxjs";
import {selectIsBlogLoading, selectSelectedBlogCategories} from "../../../store/selectors/blog.selectors";
import {CategoryActionTypes, createCategory} from "../../../store/actions/category.actions";
import {selectCategoryError, selectIsCategoryLoading} from "../../../store/selectors/category.selectors";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit, OnDestroy {

  @Output() onCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input() blog: BlogView | null;

  isBlogLoading$: Observable<boolean>;
  isCategoryLoading$: Observable<boolean>;
  categoryError$: Observable<string>;
  categories$: Observable<string[]>;

  destroyed$ = new Subject<boolean>();

  selectedSection: string;
  newCategoryInput: string;
  newBlog: string;

  changedBlogDisplayName: string;
  changedBlogDescription: string;

  constructor(private store: Store,
              private actions$: Actions) {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {
    if (this.blog && this.blog.description) {
      this.changedBlogDescription = this.blog.description;
      this.changedBlogDisplayName = this.blog.displayName;
    }
    this.isBlogLoading$ = this.store.select(selectIsBlogLoading);
    this.isCategoryLoading$ = this.store.select(selectIsCategoryLoading);
    this.categoryError$ = this.store.select(selectCategoryError);
    this.categories$ = this.store.select(selectSelectedBlogCategories);

    this.actions$.pipe(
      ofType(
        CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
        CategoryActionTypes.CREATE_CATEGORY_FAILURE),
      takeUntil(this.destroyed$)
    ).subscribe(() => this.newCategoryInput = '')
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSettingsSectionSelected(section: string) {
    this.selectedSection = section;
  }

  onNewCategoryClicked() {
    if (!this.newCategoryInput) {
      return;
    }
    this.store.dispatch(createCategory({ name: this.newCategoryInput }))
  }

  onInputEmitted($event: string) {
    console.log($event)
  }

  deleteCategory(category: string) {
  }

  onCancel() {
    this.onCloseEmitter.emit();
  }

  onSave() {
    const data: UpdateBlogData = {
      displayName: this.changedBlogDisplayName,
      description: this.changedBlogDescription
    }
    this.store.dispatch(updateBlog({data}))
  }


  logout() {
    window.alert('You are about to logout')
    this.store.dispatch(logout())
  }

  onNewBlogClicked() {

  }

  onDisplayNameChanged(displayName: string) {
    this.changedBlogDisplayName = displayName;
  }

  onDescriptionChanged(description: string) {
    this.changedBlogDescription = description;
  }
}
