import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipRemarksComponent } from './salary-slip-remarks.component';

describe('SalarySlipRemarksComponent', () => {
  let component: SalarySlipRemarksComponent;
  let fixture: ComponentFixture<SalarySlipRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarySlipRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
