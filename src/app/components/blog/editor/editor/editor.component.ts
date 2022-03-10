import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NavbarService} from "../../../../services/navbar.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @Input() postTitle = '';
  @Input() postContent = 'First line<br>Second line<br>Third line<br>';

  @ViewChild('content') content!: ElementRef;
  @ViewChild('title') title!: ElementRef;

  input!: string;

  public constructor(private navbarService: NavbarService) {}

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
