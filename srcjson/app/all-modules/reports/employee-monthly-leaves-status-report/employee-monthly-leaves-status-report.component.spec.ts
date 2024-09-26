import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMonthlyLeavesStatusReportComponent } from './employee-monthly-leaves-status-report.component';

describe('EmployeeMonthlyLeavesStatusReportComponent', () => {
  let component: EmployeeMonthlyLeavesStatusReportComponent;
  let fixture: ComponentFixture<EmployeeMonthlyLeavesStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMonthlyLeavesStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMonthlyLeavesStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
