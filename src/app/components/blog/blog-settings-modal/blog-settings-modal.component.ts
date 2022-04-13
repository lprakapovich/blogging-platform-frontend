import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";
import {BlogView} from "../../../models/BlogView";
import {UpdateBlogData} from "../../../models/data/blog/UpdateBlogData";
import {deleteBlog, updateBlog} from "../../../store/actions/blog.actions";
import {Observable, Subject, takeUntil} from "rxjs";
import {
  selectPrincipalActiveBlog,
  selectActiveBlogCategories, selectIsBlogUpdateLoading, selectIsBlogDeleteLoading,
} from "../../../store/selectors/blog.selectors";
import {
  CategoryActionTypes,
  createCategory,
  deleteCategory,
  resetCategoryError
} from "../../../store/actions/category.actions";
import {selectCategoryError, selectIsCategoryLoading} from "../../../store/selectors/category.selectors";
import {Actions, ofType} from "@ngrx/effects";
import {Category} from "../../../models/Category";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit, OnDestroy {

  @Output() onCloseEmitter: EventEmitter<void> = new EventEmitter<void>();

  blog$: Observable<BlogView>;
  isBlogUpdateLoading$: Observable<boolean>;
  isBlogDeleteLoading$: Observable<boolean>;
  isCategoryLoading$: Observable<boolean>;
  categoryError$: Observable<string>;
  categories$: Observable<Category[]>;

  unsubscribe$ = new Subject<void>();

  selectedSection: string;
  newCategoryInput: string;
  newBlog: string;
  showSuccessMessage: boolean;

  changedBlogDisplayName: string;
  changedBlogDescription: string;

  constructor(private store: Store,
              private actions$: Actions) {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {

    this.blog$ = this.store.select(selectPrincipalActiveBlog);
    this.isBlogUpdateLoading$ = this.store.select(selectIsBlogUpdateLoading);
    this.isBlogDeleteLoading$ = this.store.select(selectIsBlogDeleteLoading);
    this.isCategoryLoading$ = this.store.select(selectIsCategoryLoading);
    this.categoryError$ = this.store.select(selectCategoryError);
    this.categories$ = this.store.select(selectActiveBlogCategories);

    this.actions$.pipe(
      ofType(
        CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
        CategoryActionTypes.CREATE_CATEGORY_FAILURE),
      takeUntil(this.unsubscribe$)
    ).subscribe((action: any) => {
      if (action.type === CategoryActionTypes.CREATE_CATEGORY_SUCCESS) {
        this.showSuccessMessage = true;
      }
      this.newCategoryInput = ''
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSettingsSectionSelected(section: string) {
    this.showSuccessMessage = false;
    this.selectedSection = section;
  }

  onNewCategoryClicked() {
    if (!this.newCategoryInput) {
      return;
    }
    this.store.dispatch(createCategory({ name: this.newCategoryInput }))
  }

  onDeleteCategoryClicked(category: Category) {
    this.showSuccessMessage = false;
    const deleteCategoryMessage = `Sure you want to delete a category ${category.name}?`
    if (confirm(deleteCategoryMessage)) {
      this.store.dispatch(deleteCategory({ id: category.id }))
    }
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
    const logoutMessage = 'Sure you want to leave?'
    if (confirm(logoutMessage)) {
      this.store.dispatch(logout())
    }
  }

  onNewBlogClicked() {

  }

  onDisplayNameChanged(displayName: string) {
    this.changedBlogDisplayName = displayName;
  }

  onDescriptionChanged(description: string) {
    this.changedBlogDescription = description;
  }

  onNewCategoryInputChanged($event: string) {
    this.showSuccessMessage = false;
    this.newCategoryInput = $event;
    this.store.dispatch(resetCategoryError())
  }

  onDeleteBlogClicked() {
    this.store.dispatch(deleteBlog())
  }
}
