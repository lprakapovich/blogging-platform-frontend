import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author-data',
  templateUrl: './author-data.component.html',
  styleUrls: ['./author-data.component.scss']
})
export class AuthorDataComponent implements OnInit {

  @Input() displayName: string;
  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
  }
}
