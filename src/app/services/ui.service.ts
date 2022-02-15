import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()

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
