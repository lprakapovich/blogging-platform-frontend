import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditorService} from "../../../../../services/editor.service";

@Component({
  selector: 'app-plain-text',
  templateUrl: './plain-text.component.html',
  styleUrls: ['./plain-text.component.scss']
})
export class PlainTextComponent {

  @Output() focusReleasedEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private editorService: EditorService) { }

  releaseInputOnEnterKeyDown(component: any) {
    component.blur();
    this.focusReleasedEvent.emit(component.innerHTML.toString())
  }
}
