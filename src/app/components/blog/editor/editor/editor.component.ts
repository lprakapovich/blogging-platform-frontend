import {AfterViewInit, Component, Input} from '@angular/core';
import {NavbarService} from "../../../../services/navbar.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @Input() postTitle = '';
  @Input() postContent = '';

  public constructor(private navbarService: NavbarService) {}

  releaseInputOnEnterKeyDown(componentId: string) {
    if (componentId == 'title') {
      document.getElementById(componentId)?.blur();
      document.getElementById('content')?.innerHTML.trimStart();
      document.getElementById('content')?.focus();
    }
  }

  ngAfterViewInit(): void {
    this.navbarService.adjustRemoveButton(!!this.postContent && !!this.postTitle);
  }
}
