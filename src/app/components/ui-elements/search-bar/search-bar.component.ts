import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Blog} from "../../../models/Blog";
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchInputEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() placeholderInput: string = 'Search...';
  @Input() searchInput: string = '';

  search: string = '';
  formActive: boolean = false;

  ngOnInit(): void {
    this.search = this.searchInput;
  }

  clearInput() {
    this.search = '';
    this.formActive = false;
  }

  onInputChanged(event: any) {
    this.search = event.target.value;
    this.searchInputEvent.emit(this.search);
    this.formActive = !!this.search;
  }

  onEnterPressed(event: any) {
    this.search = event.target.value;
    this.searchInputEvent.emit(this.search);
    this.enterEvent.emit(this.search);
  }
}
