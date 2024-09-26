import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePendingShiftAssignDetailsReportComponent } from './employee-pending-shift-assign-details-report.component';

describe('EmployeePendingShiftAssignDetailsReportComponent', () => {
  let component: EmployeePendingShiftAssignDetailsReportComponent;
  let fixture: ComponentFixture<EmployeePendingShiftAssignDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePendingShiftAssignDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePendingShiftAssignDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
