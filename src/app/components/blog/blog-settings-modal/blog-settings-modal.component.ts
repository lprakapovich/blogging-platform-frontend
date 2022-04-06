import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";
import {BlogView} from "../../../models/BlogView";
import {UpdateBlogData} from "../../../models/data/blog/UpdateBlogData";
import {updateBlog} from "../../../store/actions/blog.actions";
import {Observable, Subject, takeUntil} from "rxjs";
import {
  selectAuthenticatedUserBlog,
  selectAuthenticatedUserBlogCategories,
  selectIsBlogLoading
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
  isBlogLoading$: Observable<boolean>;
  isCategoryLoading$: Observable<boolean>;
  categoryError$: Observable<string>;
  categories$: Observable<Category[]>;

  destroyed$ = new Subject<boolean>();

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
    // if (this.blog && this.blog.description) {
    //   this.changedBlogDescription = this.blog.description;
    //   this.changedBlogDisplayName = this.blog.displayName;
    // }

    this.blog$ = this.store.select(selectAuthenticatedUserBlog);
    this.isBlogLoading$ = this.store.select(selectIsBlogLoading);

    this.isCategoryLoading$ = this.store.select(selectIsCategoryLoading);
    this.categoryError$ = this.store.select(selectCategoryError);
    this.categories$ = this.store.select(selectAuthenticatedUserBlogCategories);

    this.actions$.pipe(
      ofType(
        CategoryActionTypes.CREATE_CATEGORY_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.newCategoryInput = ''
      this.showSuccessMessage = true;
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
}
