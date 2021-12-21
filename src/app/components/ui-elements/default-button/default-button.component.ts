import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent {
  @Input() label: string = 'Submit';

  constructor() { }
}
