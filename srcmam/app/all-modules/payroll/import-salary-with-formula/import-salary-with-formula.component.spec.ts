import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSalaryWithFormulaComponent } from './import-salary-with-formula.component';

describe('ImportSalaryWithFormulaComponent', () => {
  let component: ImportSalaryWithFormulaComponent;
  let fixture: ComponentFixture<ImportSalaryWithFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSalaryWithFormulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSalaryWithFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
