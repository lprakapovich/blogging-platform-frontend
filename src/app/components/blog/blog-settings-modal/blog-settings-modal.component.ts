import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit {

  @Output()
  closeModalEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  categories: string[] = [
    'Scenarios',
    'Poems', 'Scenarios', 'Poems',
    'Scenarios', 'Poems', 'Scenarios',
    'Poems', 'Scenarios', 'Poems',
    'Scenarios', 'Poems'];

  selectedSection: string;

  newCategory: string = '';

  constructor() {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {
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
}
