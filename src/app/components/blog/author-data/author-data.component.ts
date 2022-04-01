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
    const initials = this.displayName.split(' ').map(name => name[0]).join('').toUpperCase();
    let profileImage = document.getElementById('image');
    if (profileImage) {
      profileImage.innerHTML = initials;
    }
  }
}
