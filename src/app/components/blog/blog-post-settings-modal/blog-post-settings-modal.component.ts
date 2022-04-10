import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../../models/Category";
import {Status} from "../../../models/Status";

@Component({
  selector: 'app-blog-post-settings-modal',
  templateUrl: './blog-post-settings-modal.component.html',
  styleUrls: ['./blog-post-settings-modal.component.scss']
})
export class BlogPostSettingsModalComponent implements OnInit {

  @Input() isLoading: boolean | null;
  @Input() categories: Category[] | null;

  @Output() closeModalEventEmitter = new EventEmitter();
  @Output() publishEventEmitter = new EventEmitter<{
    selectedStatus: Status,
    selectedCategory: Category
  }>();

  selectedStatus: Status;
  selectedCategory: Category;

  constructor() { }

  ngOnInit(): void {

  }

  onCategorySelected(category: Category) {
    this.selectedCategory = category;
  }

  onStatusInputChanged(value: any) {
    this.selectedStatus = Status[value.target.value as keyof typeof Status];
  }

  onCancelClicked() {
    this.closeModalEventEmitter.emit();
  }

  onPublishClicked() {
    this.publishEventEmitter.emit({
      selectedCategory: this.selectedCategory,
      selectedStatus: this.selectedStatus
    })
  }
}
