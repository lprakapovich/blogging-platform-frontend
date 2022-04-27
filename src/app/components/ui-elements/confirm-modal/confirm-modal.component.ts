import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() loading: boolean | null;
  @Output() confirmEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
