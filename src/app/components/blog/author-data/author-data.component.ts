import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author-data',
  templateUrl: './author-data.component.html',
  styleUrls: ['./author-data.component.scss']
})
export class AuthorDataComponent implements OnInit {

  @Input()
  fullName!: string;


  constructor() { }

  ngOnInit(): void {
    const initials = this.fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    let profileImage = document.getElementById('image');
    if (profileImage) {
      profileImage.innerHTML = initials;
    }
  }
}
