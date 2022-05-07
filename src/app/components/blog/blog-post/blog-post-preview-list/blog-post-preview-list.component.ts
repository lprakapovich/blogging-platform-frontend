import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from "../../../../models/BlogPost";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setSelectedPost} from "../../../../store/actions/post.actions";

@Component({
  selector: 'app-blog-post-preview-list',
  templateUrl: './blog-post-preview-list.component.html',
  styleUrls: ['./blog-post-preview-list.component.scss']
})
export class BlogPostPreviewListComponent implements OnInit {

  @Input() blogPosts: BlogPost[]

  constructor(private router: Router,
              private store: Store) { }

  ngOnInit(): void {
  }

  onBlogPostSelected(post: BlogPost) {
    this.store.dispatch(setSelectedPost({ post }))
    this.router.navigate([`/publication/${post.blog.id.id}/${post.id}`])
    console.log(JSON.stringify(post))
  }
}
