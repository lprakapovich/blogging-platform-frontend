import {Component, OnInit} from '@angular/core';
import {UiService} from "./services/ui.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private uiService: UiService ) {
  }

  ngOnInit(): void {
    window.onresize = () => this.uiService.onResize();
  }
}
