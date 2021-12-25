import { Component, OnInit } from '@angular/core';
import {NavbarTemplateService} from "../../../../services/navbar-template.service";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {

  constructor(private navbarTemplateService: NavbarTemplateService) {
    this.navbarTemplateService.setNavbarTemplate('editor');
  }

  ngOnInit(): void {
  }

}
