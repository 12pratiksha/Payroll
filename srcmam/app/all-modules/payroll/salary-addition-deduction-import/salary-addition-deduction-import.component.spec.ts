import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdditionDeductionImportComponent } from './salary-addition-deduction-import.component';

describe('SalaryAdditionDeductionImportComponent', () => {
  let component: SalaryAdditionDeductionImportComponent;
  let fixture: ComponentFixture<SalaryAdditionDeductionImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryAdditionDeductionImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAdditionDeductionImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
