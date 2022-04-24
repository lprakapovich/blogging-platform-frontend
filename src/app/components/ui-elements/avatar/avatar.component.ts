import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() name: string = '';
  color: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.calculateRandomColor();
    this.calculateAvatarInitial();
  }

  private calculateRandomColor() {
    let x = Math.floor(Math.random() * 256);
    let y = 100 + Math.floor(Math.random() * 256);
    let z = 50 + Math.floor(Math.random() * 256);
    this.color = "rgb(" + x + "," + y + "," + z + ")";
  }

  private calculateAvatarInitial() {
    let avatar = this.elementRef.nativeElement.querySelector('.avatar-container');
    avatar.innerHTML = ((this.name.toUpperCase()).trim()).charAt(0);
    avatar.style.backgroundColor = this.color;
  }
}
