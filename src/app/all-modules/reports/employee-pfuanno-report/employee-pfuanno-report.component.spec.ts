import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePFUANNoReportComponent } from './employee-pfuanno-report.component';

describe('EmployeePFUANNoReportComponent', () => {
  let component: EmployeePFUANNoReportComponent;
  let fixture: ComponentFixture<EmployeePFUANNoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePFUANNoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePFUANNoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
