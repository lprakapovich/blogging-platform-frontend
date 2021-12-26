import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-default-list',
  templateUrl: './default-list.component.html',
  styleUrls: ['./default-list.component.scss']
})
export class DefaultListComponent implements OnInit {

  @Input()
  listItems: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
