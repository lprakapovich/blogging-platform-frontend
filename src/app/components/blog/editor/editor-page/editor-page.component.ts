import {Component} from '@angular/core';
import {NavbarTemplateService} from "../../../../services/ui/navbar-template.service";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent {
  constructor(private navbarTemplateService: NavbarTemplateService) {
    this.navbarTemplateService.setEditorTemplate();
  }
}
