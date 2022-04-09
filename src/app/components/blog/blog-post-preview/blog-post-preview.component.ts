import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss']
})
export class BlogPostPreviewComponent implements OnInit {

  @Input() blogPost: BlogPost;

  constructor() { }

  ngOnInit(): void {
  }

}
