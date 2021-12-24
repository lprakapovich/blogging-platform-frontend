import {Component, HostListener, OnInit} from '@angular/core';
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
    console.log('changing navbarTemplate...')
    navbarTemplateService.setNavbarTemplate('blog')
  }

  ngOnInit(): void {
     this.blogInfo = document.getElementById('statistics-information');
     this.authorInfo = document.getElementById('author-information')
     this.sticky = this.blogInfo && this.blogInfo.offsetTop;
     window.onscroll = () => this.onScroll();

     let elementById = document.getElementById('navbar');
    if (elementById) {
      elementById.classList.remove('bottom-fixed');
      elementById.classList.add('top-fixed');
      elementById.classList.add('blog');
    }


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
