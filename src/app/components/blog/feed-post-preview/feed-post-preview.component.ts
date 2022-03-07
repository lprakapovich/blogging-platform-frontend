import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed-post-preview',
  templateUrl: './feed-post-preview.component.html',
  styleUrls: ['./feed-post-preview.component.scss']
})
export class FeedPostPreviewComponent implements OnInit {

  @Output() closeFeedPostPreview: EventEmitter<void> = new EventEmitter<void>();
  postContent: any;

  constructor(private navbarTemplateService: NavbarService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.navbarTemplateService.setBlogTemplate();
    this.postContent = '<p> Elo </p> <p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p><p> Elo </p>';
  }

  onClose() {
    this.closeFeedPostPreview.emit();
  }

  openPost() {
    const blogId = 'lprakapovich';
    const postId = '23ekapvo0v98';
    this.router.navigate([`publication/@${blogId}/${postId}`])
  }
}
