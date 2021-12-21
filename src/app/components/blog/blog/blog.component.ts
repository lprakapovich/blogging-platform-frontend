import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  private blogInfo: any;
  private authorInfo: any;
  private sticky: any;

  constructor() { }

  ngOnInit(): void {
     this.blogInfo = document.getElementById('blog-information-stats');
     this.authorInfo = document.getElementById('blog-information-part')
     this.sticky = this.blogInfo && this.blogInfo.offsetTop;
     window.onscroll = () => this.onScroll();
  }

  onScroll() {
    if (this.sticky < window.pageYOffset) {
      this.authorInfo.classList.add('sticky');
      console.log('added a sticky class')
    } else {
      this.authorInfo.classList.remove('sticky');
      console.log('removed a sticky class')
    }
  }
}
