import {Component} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  innerHeader = "header"
  innerHtml =
    "<p> I am going to start my first paragraph</p>" +
    "<p> I am going to start my second paragraph</p>";

  releaseInputOnEnterKeyDown(componentId: string) {
    if (componentId == 'header-span') {
      document.getElementById(componentId)?.blur();
      document.getElementById('input')?.innerHTML.trimStart();
      document.getElementById('input')?.focus();
    }
  }
}
