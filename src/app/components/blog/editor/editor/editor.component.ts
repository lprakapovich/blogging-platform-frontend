import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {H2Component} from "../editor-components/h2/h2.component";
import {EditorService} from "../../../../services/editor.service";
import {PlainTextComponent} from "../editor-components/plain-text/plain-text.component";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @ViewChild('parent', {read: ViewContainerRef}) target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private editorService: EditorService) {
  }

  releaseInputOnEnterKeyDown(inputId: string) {
    this.editorService.releaseInput(inputId);
  }

  addComponent() {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(H2Component);
    this.componentRef = this.target.createComponent(childComponent);
  }

  addPlainTextComponent() {
    let plainTextComponent = this.componentFactoryResolver.resolveComponentFactory(PlainTextComponent);
    this.componentRef = this.target.createComponent(plainTextComponent);
  }

  onFocusReleased($event: string) {
    console.log(this.componentRef)
    // console.log($event)
  }
}
