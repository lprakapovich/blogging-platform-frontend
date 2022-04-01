import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";
import {BlogView} from "../../../models/BlogView";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit {

  @Output() onCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input() categories: string[] = [];
  @Input() blog: BlogView | null;

  selectedSection: string;
  newCategory: string;
  newBlog: string;

  constructor(private store: Store) {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {
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
    this.onCloseEmitter.emit();
  }

  logout() {
    window.alert('You are about to logout')
    this.store.dispatch(logout())
  }

  onNewBlogClicked() {

  }
}
