import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInformationReportComponent } from './employee-information-report.component';

describe('EmployeeInformationReportComponent', () => {
  let component: EmployeeInformationReportComponent;
  let fixture: ComponentFixture<EmployeeInformationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeInformationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInformationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
