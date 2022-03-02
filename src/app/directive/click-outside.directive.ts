import {Directive, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';


@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutsideEventEmitter = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      console.log('outside click of xx');
      this.clickOutsideEventEmitter.emit();
    }
  }
}
