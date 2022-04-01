import {Component, HostListener, OnInit} from '@angular/core';
import {UiService} from "./services/ui/ui.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private uiService: UiService ) {
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.uiService.documentClickedTarget.next(event.target)
  }

  ngOnInit(): void {
    window.onresize = () => this.uiService.onResize();
  }
}
