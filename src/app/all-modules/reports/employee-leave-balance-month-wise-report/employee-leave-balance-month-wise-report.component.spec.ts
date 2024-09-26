import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveBalanceMonthWiseReportComponent } from './employee-leave-balance-month-wise-report.component';

describe('EmployeeLeaveBalanceMonthWiseReportComponent', () => {
  let component: EmployeeLeaveBalanceMonthWiseReportComponent;
  let fixture: ComponentFixture<EmployeeLeaveBalanceMonthWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveBalanceMonthWiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveBalanceMonthWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
