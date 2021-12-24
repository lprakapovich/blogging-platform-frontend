import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-plus-circle-button',
  templateUrl: './plus-circle-button.component.html',
  styleUrls: ['./plus-circle-button.component.scss']
})
export class PlusCircleButtonComponent implements OnInit {

  faPlusSquare = faPlusSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
