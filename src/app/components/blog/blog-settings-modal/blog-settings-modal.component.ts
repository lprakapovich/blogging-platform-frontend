import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-settings-modal',
  templateUrl: './blog-settings-modal.component.html',
  styleUrls: ['./blog-settings-modal.component.scss']
})
export class BlogSettingsModalComponent implements OnInit {

  selectedSection: string;

  constructor() {
    this.selectedSection = 'account';
  }

  ngOnInit(): void {
  }

  onSettingsSectionSelected(section: string) {
    this.selectedSection = section;
  }
}
