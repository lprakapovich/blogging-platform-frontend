import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../../models/Category";
import {Status} from "../../../models/Status";
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-blog-post-settings-modal',
  templateUrl: './blog-post-settings-modal.component.html',
  styleUrls: ['./blog-post-settings-modal.component.scss']
})
export class BlogPostSettingsModalComponent implements OnInit {

  @Input() isLoading: boolean | null;
  @Input() categories: Category[] | null;
  @Input() editedPost: BlogPost | null;

  @Output() closeModalEventEmitter = new EventEmitter();
  @Output() publishEventEmitter = new EventEmitter<{
    selectedStatus: Status,
    selectedCategory?: Category
  }>();

  selectedStatus: Status;
  selectedCategory: Category | null;

  draft = Status.Draft
  published = Status.Published

  constructor() { }

  ngOnInit(): void {

    this.selectedStatus = this.published;

    if (!!this.editedPost) {
      if (!!this.editedPost.category) {
        this.selectedCategory = this.editedPost.category;
      }
      this.selectedStatus = this.editedPost.status;
    }
  }

  onCategorySelected(category: Category | null) {
    this.selectedCategory = category;
  }

  onStatusInputChanged(value: any) {
    this.selectedStatus = Status[value.target.value as keyof typeof Status];
  }

  onCancelClicked() {
    this.closeModalEventEmitter.emit();
  }

  onPublishClicked() {

    let baseEmitData = {
      selectedStatus: this.selectedStatus
    }

    let emitData = !!this.selectedCategory ? {
        ...baseEmitData,
      selectedCategory: this.selectedCategory
    } : baseEmitData;

    console.log(JSON.stringify(emitData))
    this.publishEventEmitter.emit(emitData)
  }
}
