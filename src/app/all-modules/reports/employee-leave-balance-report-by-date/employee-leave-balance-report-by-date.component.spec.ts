import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveBalanceReportByDateComponent } from './employee-leave-balance-report-by-date.component';

describe('EmployeeLeaveBalanceReportByDateComponent', () => {
  let component: EmployeeLeaveBalanceReportByDateComponent;
  let fixture: ComponentFixture<EmployeeLeaveBalanceReportByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveBalanceReportByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveBalanceReportByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
