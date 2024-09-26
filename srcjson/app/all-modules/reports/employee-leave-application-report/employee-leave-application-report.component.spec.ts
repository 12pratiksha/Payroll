import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveApplicationReportComponent } from './employee-leave-application-report.component';

describe('EmployeeLeaveApplicationReportComponent', () => {
  let component: EmployeeLeaveApplicationReportComponent;
  let fixture: ComponentFixture<EmployeeLeaveApplicationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveApplicationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveApplicationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
