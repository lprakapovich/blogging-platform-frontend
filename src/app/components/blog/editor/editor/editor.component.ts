import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EditorService} from "../../../../services/editor.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @ViewChild('parent', {read: ViewContainerRef}) target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  innerHeader = "header"
  innerHtml =
    "<p> I am going to start my first paragraph</p>" +
    "<p> I am going to start my second paragraph</p>";

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private editorService: EditorService) {
  }

  releaseInputOnEnterKeyDown(componentId: string) {
    if (componentId == 'header-span') {
      document.getElementById(componentId)?.blur();
      document.getElementById('input')?.innerHTML.trimStart();
      document.getElementById('input')?.focus();
    }
  }
}
