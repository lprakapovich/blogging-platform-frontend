import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {H2Component} from "../editor-components/h2/h2.component";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @ViewChild('parent', {read: ViewContainerRef}) target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  releaseInputOnEnterKeyDown(inputId: string) {
    let inputToRelease = document.getElementById(inputId);
    if (inputToRelease) {
     inputToRelease.blur();
    }
  }

  addComponent() {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(H2Component);
    this.componentRef = this.target.createComponent(childComponent);
  }
}
