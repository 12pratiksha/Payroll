import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypeWiseSalaryRegisterReportComponent } from './employee-type-wise-salary-register-report.component';

describe('EmployeeTypeWiseSalaryRegisterReportComponent', () => {
  let component: EmployeeTypeWiseSalaryRegisterReportComponent;
  let fixture: ComponentFixture<EmployeeTypeWiseSalaryRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTypeWiseSalaryRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTypeWiseSalaryRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
