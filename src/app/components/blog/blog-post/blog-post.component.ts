import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from "../../../models/BlogPost";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  @Input() post!: BlogPost;

  constructor(private navbarService: NavbarService) {
    this.post = {id: '1',
      blogId: 'lprakapoich',
      title: '1st day of the war',
      author: "Liza",
      content: "<p>Хотя я перестала вести блог в ЖЖ в этом году, около недели назад мне прилетело поздравление. С тем, что теперь я полных 20 лет там пишу.</p>" +
        "<p>Cпасибо.</p>"};
  }

  ngOnInit(): void {
    this.navbarService.setBlogTemplate();
  }
}
