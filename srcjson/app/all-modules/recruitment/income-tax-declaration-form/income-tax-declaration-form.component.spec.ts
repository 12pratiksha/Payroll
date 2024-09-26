import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTaxDeclarationFormComponent } from './income-tax-declaration-form.component';

describe('IncomeTaxDeclarationFormComponent', () => {
  let component: IncomeTaxDeclarationFormComponent;
  let fixture: ComponentFixture<IncomeTaxDeclarationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeTaxDeclarationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTaxDeclarationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
