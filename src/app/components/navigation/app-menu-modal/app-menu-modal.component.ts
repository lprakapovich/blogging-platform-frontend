import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlogId} from "../../../models/Blog";

@Component({
  selector: 'app-menu-modal',
  templateUrl: './app-menu-modal.component.html',
  styleUrls: ['./app-menu-modal.component.scss']
})
export class AppMenuModalComponent {

  @Input() userBlogIds: BlogId[] | null = [] ;
  @Input() activeBlogId: BlogId | null;

  @Output() userBlogSelectedEmitter = new EventEmitter<BlogId>();
  @Output() settingsEmitter = new EventEmitter<void>();

  constructor() { }

  onUserBlogSelected(userBlogId: any) {
    this.userBlogSelectedEmitter.emit(userBlogId);
  }

  onSettingsSelected() {
    this.settingsEmitter.emit();
  }
}
