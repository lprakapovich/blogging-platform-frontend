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

  private navbarModal!: HTMLElement | null;
  private blogSettingsModal!: HTMLElement | null;

  private NAVBAR_MODAL_ID = 'navbar-modal';
  private BLOG_SETTINGS_MODAL_ID = 'blog-settings-modal';

  constructor(private router: Router, private navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this.navbarService.setBlogTemplate()
    this.navbarModal = document.getElementById(this.NAVBAR_MODAL_ID);
    this.blogSettingsModal = document.getElementById(this.BLOG_SETTINGS_MODAL_ID);
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

  onSettingsClicked() {
    this.showModal(false, this.NAVBAR_MODAL_ID);
    this.showModal(true, this.BLOG_SETTINGS_MODAL_ID);
  }

  private setUpShowModalListener() {
    this.navbarService.getNavbarShowModalChangeSubject().subscribe(show => {
      this.showModal(show, this.NAVBAR_MODAL_ID)
    })
  }

  private setUpOnPageScrollListener() {
    this.blogInfo = document.getElementById('statistics-information');
    this.authorInfo = document.getElementById('author-information')
    this.sticky = this.blogInfo?.offsetTop;
    window.onscroll = () => this.onScroll();
  }

  private showModal(show: boolean, modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (show) {
        modal.style.display = 'flex';
        this.adjustPositioning(modalId, modal);
      } else {
        modal.style.display = 'none';
      }
    }
  }

  private adjustPositioning(modalId: string, modal: HTMLElement) {
    switch (modalId) {
      case this.NAVBAR_MODAL_ID:
        modal.style.justifyContent = 'end';
        break;
      case this.BLOG_SETTINGS_MODAL_ID:
        modal.style.justifyContent = 'center';
        break;
    }
  }
}
