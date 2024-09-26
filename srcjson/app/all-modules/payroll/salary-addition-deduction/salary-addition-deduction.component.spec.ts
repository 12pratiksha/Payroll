import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdditionDeductionComponent } from './salary-addition-deduction.component';

describe('SalaryAdditionDeductionComponent', () => {
  let component: SalaryAdditionDeductionComponent;
  let fixture: ComponentFixture<SalaryAdditionDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryAdditionDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAdditionDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
