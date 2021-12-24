import { Injectable } from '@angular/core';
import {faBell, faPlusSquare, faUser} from "@fortawesome/free-regular-svg-icons";
import {faNewspaper} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class IconResolverService {

  constructor() { }

   resolveIcon(icon: string) {
    switch (icon) {
      case 'newArticleIcon':
        return faPlusSquare;
      case 'feedIcon':
        return faNewspaper;
      case 'notificationsIcon':
        return faBell;
      case 'profileIcon':
        return faUser;
      default:
        return faPlusSquare;
    }
  }
}
