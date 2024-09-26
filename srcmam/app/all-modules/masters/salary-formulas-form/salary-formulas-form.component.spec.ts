import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryFormulasFormComponent } from './salary-formulas-form.component';

describe('SalaryFormulasFormComponent', () => {
  let component: SalaryFormulasFormComponent;
  let fixture: ComponentFixture<SalaryFormulasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryFormulasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryFormulasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
