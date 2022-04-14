import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";
import {BlogView} from "../../../models/BlogView";
import {UpdateBlogData} from "../../../models/data/blog/UpdateBlogData";
import {BlogActionTypes, createBlog, deleteBlog, updateBlog} from "../../../store/actions/blog.actions";
import {Observable, Subject, takeUntil} from "rxjs";
import {
  selectActiveBlogCategories,
  selectBlogError,
  selectIsBlogCreateLoading,
  selectIsBlogDeleteLoading,
  selectIsBlogUpdateLoading,
  selectPrincipalActiveBlog,
  selectPrincipalManagedBlogIds,
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
import {BlogId} from "../../../models/Blog";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit, OnDestroy {

  generalSection = 'General';
  newBlogSection = 'New Blog';
  categorySection = 'Categories';

  @Output() onCloseEmitter: EventEmitter<void> = new EventEmitter<void>();

  activeBlog$: Observable<BlogView>;
  isBlogCreateLoading: Observable<boolean>;
  isBlogUpdateLoading$: Observable<boolean>;
  isBlogDeleteLoading$: Observable<boolean>;
  blogError$: Observable<any>;

  categories$: Observable<Category[]>;
  isCategoryLoading$: Observable<boolean>;
  categoryError$: Observable<string>;

  unsubscribe$ = new Subject<void>();

  selectedSection: string;
  newCategoryInput: string;
  newBlogInput: string;
  createCategorySuccess: boolean;
  createBlogSuccess: boolean;

  changedBlogDisplayName: string;
  changedBlogDescription: string;

  constructor(private store: Store,
              private actions$: Actions) {

    this.selectedSection = this.generalSection;
  }

  ngOnInit(): void {

    this.createBlogSuccess = false;
    this.createCategorySuccess = false;

    this.activeBlog$ = this.store.select(selectPrincipalActiveBlog);
    this.isBlogCreateLoading = this.store.select(selectIsBlogCreateLoading);
    this.isBlogUpdateLoading$ = this.store.select(selectIsBlogUpdateLoading);
    this.isBlogDeleteLoading$ = this.store.select(selectIsBlogDeleteLoading);
    this.blogError$ = this.store.select(selectBlogError);

    this.isCategoryLoading$ = this.store.select(selectIsCategoryLoading);
    this.categoryError$ = this.store.select(selectCategoryError);
    this.categories$ = this.store.select(selectActiveBlogCategories);

    this.actions$.pipe(
      ofType(
        CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
        CategoryActionTypes.CREATE_CATEGORY_FAILURE
        ),
      takeUntil(this.unsubscribe$)
    ).subscribe((action: any) => {
      if (action.type === CategoryActionTypes.CREATE_CATEGORY_SUCCESS) {
        this.createCategorySuccess = true;
      }
      this.newCategoryInput = ''
    })

    this.actions$.pipe(
      ofType(
        BlogActionTypes.CREATE_BLOG_SUCCESS,
        BlogActionTypes.CREATE_BLOG_FAILURE
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe((action: any) => {
      if (action.type === BlogActionTypes.CREATE_BLOG_SUCCESS) {
        this.createBlogSuccess = true;
      }
      this.newBlogInput = '';
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSettingsSectionSelected(section: string) {
    this.createCategorySuccess = false;
    this.selectedSection = section;
  }

  onNewCategoryClicked() {
    if (!this.newCategoryInput) {
      return;
    }
    this.store.dispatch(createCategory({ name: this.newCategoryInput }))
  }

  onDeleteCategoryClicked(category: Category) {
    this.createCategorySuccess = false;
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
    if (!!this.newBlogInput) {
      this.store.dispatch(createBlog( { blogId: this.newBlogInput }))
    }
  }

  onDeleteBlogClicked() {
    this.store.dispatch(deleteBlog())
  }

  onDisplayNameChanged(displayName: string) {
    this.changedBlogDisplayName = displayName;
  }

  onDescriptionChanged(description: string) {
    this.changedBlogDescription = description;
  }

  onNewCategoryInputChanged($event: string) {
    this.createCategorySuccess = false;
    this.newCategoryInput = $event;
    this.store.dispatch(resetCategoryError())
  }

  onNewBlogInputChanged($event: string) {
    this.createBlogSuccess = false;
    this.newBlogInput = $event;
  }
}
