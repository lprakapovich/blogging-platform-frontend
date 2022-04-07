import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NavbarTemplateService} from "../../../../services/ui/navbar-template.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @Input() postTitle = '';
  @Input() postContent = '';

  @ViewChild('content') content: ElementRef;
  @ViewChild('title') title: ElementRef;

  input: string;

  public constructor(private navbarService: NavbarTemplateService) {}

  releaseInputOnEnterKeyDown(componentId: string) {
    if (componentId == 'title') {
      this.title.nativeElement.blur();
      this.content.nativeElement.innerHTML.trimStart();
      this.content.nativeElement.focus();
    }
  }

  ngAfterViewInit(): void {
    // this.navbarService.adjustRemoveButton(!!this.postContent && !!this.postTitle);
  }

  onKeyUp(event: any) {
  }

  onFocus() {
  }

  onFocusLost() {
  }

  lostFocusOnEnter() {
  }
}
