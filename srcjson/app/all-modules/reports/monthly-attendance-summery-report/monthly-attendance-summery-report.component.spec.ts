import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAttendanceSummeryReportComponent } from './monthly-attendance-summery-report.component';

describe('MonthlyAttendanceSummeryReportComponent', () => {
  let component: MonthlyAttendanceSummeryReportComponent;
  let fixture: ComponentFixture<MonthlyAttendanceSummeryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyAttendanceSummeryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAttendanceSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
