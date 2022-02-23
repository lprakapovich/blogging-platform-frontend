import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() searchInputEvent: EventEmitter<string> = new EventEmitter<string>();
  searchInput: string = '';
  formActive: boolean = false;

  clearInput() {
    this.searchInput = '';
    this.formActive = false;
  }

  onInputChanged(event: any) {
    this.searchInput = event.target.value;
    this.searchInputEvent.emit(this.searchInput);
    this.formActive = !!this.searchInput;
  }
}
