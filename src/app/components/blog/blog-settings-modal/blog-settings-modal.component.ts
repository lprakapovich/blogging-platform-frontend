import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";
import {BlogView} from "../../../models/BlogView";
import {UpdateBlogData} from "../../../models/data/blog/UpdateBlogData";
import {updateBlog} from "../../../store/actions/blog.actions";
import {Observable} from "rxjs";
import {selectIsBlogLoading} from "../../../store/selectors/blog.selectors";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit {

  @Output() onCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input() categories: string[] = [];
  @Input() blog: BlogView | null;

  isLoading$: Observable<boolean>;

  selectedSection: string;
  newCategory: string;
  newBlog: string;

  changedBlogDisplayName: string;
  changedBlogDescription: string;

  constructor(private store: Store) {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {
    if (this.blog && this.blog.description) {
      this.changedBlogDescription = this.blog.description;
      this.changedBlogDisplayName = this.blog.displayName;
    }

    this.isLoading$ = this.store.select(selectIsBlogLoading);
  }

  onSettingsSectionSelected(section: string) {
    this.selectedSection = section;
  }

  onNewCategoryClicked() {
    this.newCategory = '';
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
