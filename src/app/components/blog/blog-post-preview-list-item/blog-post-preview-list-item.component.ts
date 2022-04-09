import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-blog-post-preview-list-item',
  templateUrl: './blog-post-preview-list-item.component.html',
  styleUrls: ['./blog-post-preview-list-item.component.scss']
})
export class BlogPostPreviewListItemComponent implements OnInit {

  @Input() blogPost: BlogPost;

  constructor() { }

  ngOnInit(): void {
  }

}

