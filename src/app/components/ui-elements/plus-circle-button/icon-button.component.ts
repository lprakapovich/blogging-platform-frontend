import {Component, Input, OnInit} from '@angular/core';
import {IconResolverService} from "../../../services/icon-resolver.service";

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input()
  icon!: any;
  fontAwesomeIcon: any;

  constructor(private iconResolverService: IconResolverService) {
  }

  ngOnInit(): void {
    this.fontAwesomeIcon = this.iconResolverService.resolveIcon(this.icon);
  }
}
