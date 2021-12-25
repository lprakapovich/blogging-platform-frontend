import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarTemplateService} from "../../../services/navbar-template.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  private blogInfo: any;
  private authorInfo: any;
  private sticky: any;

  constructor(private router: Router, private navbarTemplateService: NavbarTemplateService) {
    navbarTemplateService.setNavbarTemplate('blog')
  }

  ngOnInit(): void {
     this.blogInfo = document.getElementById('statistics-information');
     this.authorInfo = document.getElementById('author-information')
     this.sticky = this.blogInfo?.offsetTop;

     window.onscroll = () => this.onScroll();

     let navbar = document.getElementById('navbar');
     navbar?.classList.remove('bottom-fixed');
     navbar?.classList.add('top-fixed');
     navbar?.classList.add('blog');
  }

  onScroll() {
    if (this.sticky < window.pageYOffset) {
      this.authorInfo.classList.add('sticky');
    } else {
      this.authorInfo.classList.remove('sticky');
    }
  }

  onNewPostClicked() {
    this.router.navigate(['/editor-page']);
  }
}
