import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  onResize() {
    let navbar = document.getElementById('navbar');
    if (navbar && navbar.querySelector('#default-navigation')) {
      if (window.innerWidth < 620) {
        navbar.classList.remove('bottom-fixed');
        navbar.classList.add('top-fixed');
      } else {
        navbar.classList.remove('top-fixed');
        navbar.classList.add('bottom-fixed');
      }
    }
  }
}
