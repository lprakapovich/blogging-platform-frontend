import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss']
})
export class InformationModalComponent implements OnInit, OnDestroy {

  @Input() body: string = '';
  @Output() closeEvent = new EventEmitter();
  @Output() clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log("Information modal init")
  }

  ngOnDestroy(): void {
    console.log("Information modal destroy")
  }

  onClick() {
    this.clickEvent.emit();
  }
}
