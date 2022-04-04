import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-button',
  templateUrl: './svg-button.component.html',
  styleUrls: ['./svg-button.component.scss']
})
export class SvgButtonComponent implements OnInit {

  @Input()
  iconTemplate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
