import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmployeeDetailsReportComponent } from './get-employee-details-report.component';

describe('GetEmployeeDetailsReportComponent', () => {
  let component: GetEmployeeDetailsReportComponent;
  let fixture: ComponentFixture<GetEmployeeDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEmployeeDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmployeeDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
