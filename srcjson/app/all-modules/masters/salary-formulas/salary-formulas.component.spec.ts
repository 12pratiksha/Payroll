import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryFormulasComponent } from './salary-formulas.component';

describe('SalaryFormulasComponent', () => {
  let component: SalaryFormulasComponent;
  let fixture: ComponentFixture<SalaryFormulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryFormulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
