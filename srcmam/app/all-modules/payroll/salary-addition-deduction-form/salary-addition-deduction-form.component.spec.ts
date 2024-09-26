import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdditionDeductionFormComponent } from './salary-addition-deduction-form.component';

describe('SalaryAdditionDeductionFormComponent', () => {
  let component: SalaryAdditionDeductionFormComponent;
  let fixture: ComponentFixture<SalaryAdditionDeductionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryAdditionDeductionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAdditionDeductionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
