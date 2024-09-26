import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTaxTableComponent } from './professional-tax-table.component';

describe('ProfessionalTaxTableComponent', () => {
  let component: ProfessionalTaxTableComponent;
  let fixture: ComponentFixture<ProfessionalTaxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalTaxTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalTaxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
