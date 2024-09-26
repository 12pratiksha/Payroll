import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAttendenanceReportComponent } from './daily-attendenance-report.component';

describe('DailyAttendenanceReportComponent', () => {
  let component: DailyAttendenanceReportComponent;
  let fixture: ComponentFixture<DailyAttendenanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyAttendenanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyAttendenanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
