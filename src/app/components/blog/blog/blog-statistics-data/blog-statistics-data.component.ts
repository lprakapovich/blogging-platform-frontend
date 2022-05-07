import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-statistics-data',
  templateUrl: './blog-statistics-data.component.html',
  styleUrls: ['./blog-statistics-data.component.scss']
})
export class BlogStatisticsDataComponent implements OnInit {

  @Input() subscribersNum: number = 0;
  @Input() subscriptionsNum: number = 0;
  @Input() publicationsNum: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
