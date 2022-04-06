import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-default-list',
  templateUrl: './default-list.component.html',
  styleUrls: ['./default-list.component.scss']
})
export class DefaultListComponent {

  @Input() listItems: any[] = [];
  @Input() listItemCallbackFormatter: (item: any) => string;
  @Output() itemSelectedEmitter = new EventEmitter<any>();

  onItemSelectedEmitter(item: any) {
    this.itemSelectedEmitter.emit(item)
  }
}
