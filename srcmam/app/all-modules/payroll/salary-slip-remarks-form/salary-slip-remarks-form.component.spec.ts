import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipRemarksFormComponent } from './salary-slip-remarks-form.component';

describe('SalarySlipRemarksFormComponent', () => {
  let component: SalarySlipRemarksFormComponent;
  let fixture: ComponentFixture<SalarySlipRemarksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarySlipRemarksFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipRemarksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
