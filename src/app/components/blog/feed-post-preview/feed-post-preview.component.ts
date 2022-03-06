import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-feed-post-preview',
  templateUrl: './feed-post-preview.component.html',
  styleUrls: ['./feed-post-preview.component.scss']
})
export class FeedPostPreviewComponent implements OnInit {

  @Output() closeFeedPostPreview: EventEmitter<void> = new EventEmitter<void>();
  postContent: any;

  constructor(private navbarTemplateService: NavbarService) {

  }

  ngOnInit(): void {
    this.navbarTemplateService.setBlogTemplate();
    this.postContent = '<p> Elo </p> <p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p>';
  }

  onClose() {
    this.closeFeedPostPreview.emit();
  }
}
