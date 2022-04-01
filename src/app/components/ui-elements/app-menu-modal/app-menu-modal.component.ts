import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './app-menu-modal.component.html',
  styleUrls: ['./app-menu-modal.component.scss']
})
export class AppMenuModalComponent {

  @Input() userBlogIds: string[] | null = [] ;

  @Output() userBlogSelectedEmitter = new EventEmitter<string>();
  @Output() settingsEmitter = new EventEmitter<void>();

  constructor() { }

  onUserBlogSelected(userBlogId: any) {
    this.userBlogSelectedEmitter.emit(userBlogId);
  }

  onSettingsSelected() {
    this.settingsEmitter.emit();
  }
}
