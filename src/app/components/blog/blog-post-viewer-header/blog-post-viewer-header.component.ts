import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BlogPost} from "../../../models/BlogPost";
import {Blog, BlogId} from "../../../models/Blog";

@Component({
  selector: 'app-blog-post-viewer-header',
  templateUrl: './blog-post-viewer-header.component.html',
  styleUrls: ['./blog-post-viewer-header.component.scss']
})
export class BlogPostViewerHeaderComponent implements OnInit {

  @Input() blogPost: BlogPost;
  @Output() blogNameClickEventEmitter = new EventEmitter<BlogId>();

  constructor() { }

  ngOnInit(): void {
  }

  onBlogNameClicked(blog: Blog) {
    this.blogNameClickEventEmitter.emit(blog.id)
  }
}
