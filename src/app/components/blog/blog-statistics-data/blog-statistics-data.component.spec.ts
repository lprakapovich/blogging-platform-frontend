import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogStatisticsDataComponent } from './blog-statistics-data.component';

describe('BlogStatisticsDataComponent', () => {
  let component: BlogStatisticsDataComponent;
  let fixture: ComponentFixture<BlogStatisticsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogStatisticsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogStatisticsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
