import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchInput: string = '';

  constructor() { }

  clearInput() {
    this.searchInput = '';
  }

  onInputChanged(event: any) {
    this.searchInput = event.target.value;
    console.log(event.target.value)
  }
}
