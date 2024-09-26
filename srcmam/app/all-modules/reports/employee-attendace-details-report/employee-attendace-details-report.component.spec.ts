import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendaceDetailsReportComponent } from './employee-attendace-details-report.component';

describe('EmployeeAttendaceDetailsReportComponent', () => {
  let component: EmployeeAttendaceDetailsReportComponent;
  let fixture: ComponentFixture<EmployeeAttendaceDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAttendaceDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendaceDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
