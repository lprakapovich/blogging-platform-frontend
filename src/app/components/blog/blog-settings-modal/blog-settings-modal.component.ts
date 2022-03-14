import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../../store/actions/auth.actions";

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit {

  @Output() closeModalEventEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCreatedEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  categories: string[] = [
  ];

  selectedSection: string;

  newCategory: string = '';

  constructor(private store: Store) {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {
    this.onCreatedEventEmitter.emit();
  }

  onSettingsSectionSelected(section: string) {
    this.selectedSection = section;
  }

  onNewCategoryClicked() {
    console.log('new category created: '+ this.newCategory)
    this.newCategory = '';
  }

  onInputEmitted($event: string) {
    console.log($event)
  }

  deleteCategory(category: string) {
    console.log('deleting ' + category)
  }

  onCancel() {
    console.log('Cancel')
    this.closeModalEventEmitter.emit();
  }

  onSave() {
    console.log('Save');
    this.closeModalEventEmitter.emit();
  }

  logout() {
    this.store.dispatch(logout())
  }
}
