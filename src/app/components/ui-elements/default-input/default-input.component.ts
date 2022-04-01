import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss']
})
export class DefaultInputComponent {

  @Input()
  placeholder: string;

  @Input()
  userInput: string;

  @Input()
  disabled: boolean;

  @Output()
  userInputEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.placeholder = 'Your input...';
  }

  onKeyUp(value: string) {
    this.userInput = value;
    this.userInputEventEmitter.emit(value);
  }
}
