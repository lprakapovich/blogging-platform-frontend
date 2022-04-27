import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {BlogView} from "../../../models/BlogView";
import {UpdateBlogData} from "../../../models/data/blog/UpdateBlogData";
import {BlogActionTypes, createBlog, updateBlog} from "../../../store/actions/blog.actions";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {
  selectActiveBlogCategories,
  selectBlogError,
  selectIsBlogCreateLoading,
  selectIsBlogDeleteLoading,
  selectIsBlogUpdateLoading,
  selectPrincipalActiveBlog,
} from "../../../store/selectors/blog.selectors";
import {CategoryActionTypes, createCategory, resetCategoryError} from "../../../store/actions/category.actions";
import {selectCategoryError, selectIsCategoryLoading} from "../../../store/selectors/category.selectors";
import {Actions, ofType} from "@ngrx/effects";
import {Category} from "../../../models/Category";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit, OnDestroy {

  generalSection = 'General';
  newBlogSection = 'New Blog';
  categorySection = 'Categories';

  @Output() onCloseEmitter = new EventEmitter<void>();
  @Output() onLogoutEmitter = new EventEmitter<void>();
  @Output() onDeleteBlogEmitter = new EventEmitter<void>();
  @Output() onDeleteCategoryEmitter = new EventEmitter<Category>();

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

    this.actions$.pipe(
        ofType(BlogActionTypes.DELETE_BLOG_SUCCESS),
        takeUntil(this.unsubscribe$)
    ).subscribe(() => this.onCloseEmitter.emit())

    this.activeBlog$.pipe(
      take(1)
    ).subscribe(blog => {
      this.changedBlogDisplayName = blog.displayName;
      this.changedBlogDescription = blog.description
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
    this.onDeleteCategoryEmitter.emit(category);
  }

  onSave() {
    console.log('on save')
    console.log('desc' + this.changedBlogDescription)
    console.log('name' + this.changedBlogDisplayName)

    const data: UpdateBlogData = {
      displayName: this.changedBlogDisplayName?.trim(),
      description: this.changedBlogDescription?.trim()
    }

    this.store.dispatch(updateBlog({updateBlogData: data}))
  }

  onCancel() {
    this.onCloseEmitter.emit();
  }

  onLogout() {
    this.onLogoutEmitter.emit();
  }

  onDeleteBlog() {
    this.onDeleteBlogEmitter.emit();
  }

  onNewBlogClicked() {
    if (!!this.newBlogInput) {
      this.store.dispatch(createBlog( { blogId: this.newBlogInput }))
    }
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
