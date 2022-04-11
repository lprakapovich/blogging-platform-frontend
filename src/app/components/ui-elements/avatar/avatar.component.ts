import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterViewInit {

  @Input() name: string = '';
  color: string;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {

    let avatar = this.elementRef.nativeElement.querySelector('.avatar-container');
    avatar.innerHTML = this.name.substring(1, 0).toUpperCase();
    avatar.style.backgroundColor = this.color;
  }

  ngOnInit(): void {
    let x = Math.floor(Math.random() * 256);
    let y = 100 + Math.floor(Math.random() * 256);
    let z = 50 + Math.floor(Math.random() * 256);
    this.color = "rgb(" + x + "," + y + "," + z + ")";
  }
}
