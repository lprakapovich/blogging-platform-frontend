import {Component, Input, OnInit} from '@angular/core';
import {NavbarService} from "../../../../services/navbar.service";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent {
  constructor(private navbarTemplateService: NavbarService) {
    this.navbarTemplateService.setEditorTemplate();
  }
}
