import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavbarTemplateService} from "../../../../services/ui/navbar-template.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BlogPost} from "../../../../models/BlogPost";
import {Store} from "@ngrx/store";
import {selectSelectedPost} from "../../../../store/selectors/post.selectors";
import {BlogId} from "../../../../models/Blog";
import {getBlogDetailsAndRedirect} from "../../../../store/actions/blog.actions";

@Component({
  selector: 'app-feed-post-preview',
  templateUrl: './feed-post-preview.component.html',
  styleUrls: ['./feed-post-preview.component.scss']
})
export class FeedPostPreviewComponent implements OnInit {

  selectedPost$: Observable<BlogPost | null>;
  @Output() closeFeedPostPreview: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store,
              private navbarTemplateService: NavbarTemplateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.navbarTemplateService.setBlogTemplate();
    this.selectedPost$ = this.store.select(selectSelectedPost)
  }

  onPostClose() {
    this.closeFeedPostPreview.emit();
  }

  onPostOpen() {
    this.router.navigate([`publication/@${"blogId"}/${"postId"}`])
  }

  onBlogNameClickedEvent(blogId: BlogId) {
    this.store.dispatch(getBlogDetailsAndRedirect({ blogId }))
  }
}
