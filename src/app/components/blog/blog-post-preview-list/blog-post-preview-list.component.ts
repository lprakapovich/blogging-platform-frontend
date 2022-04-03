import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-blog-post-preview-list',
  templateUrl: './blog-post-preview-list.component.html',
  styleUrls: ['./blog-post-preview-list.component.scss']
})
export class BlogPostPreviewListComponent implements OnInit {

  @Input() blogPosts: BlogPost[]

  constructor() { }

  ngOnInit(): void {
  }

}
