import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  private blogInfo: any;
  private authorInfo: any;
  private sticky: any;
  private navbarModal: any;

  constructor(private router: Router, private navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this.navbarService.setBlogTemplate()
    this.setUpShowModalListener();
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

  private setUpShowModalListener() {
    this.navbarModal = document.getElementById('navbar-modal');
    this.navbarService.getNavbarShowModalChangeSubject().subscribe(show => {
      if (show) {
        this.navbarModal.style.display = 'flex';
        this.navbarModal.style.justifyContent = 'end';
      } else {
        this.navbarModal.style.display = 'none';
      }
    })
  }

  private setUpOnPageScrollListener() {
    this.blogInfo = document.getElementById('statistics-information');
    this.authorInfo = document.getElementById('author-information')
    this.sticky = this.blogInfo?.offsetTop;
    window.onscroll = () => this.onScroll();
  }
}
