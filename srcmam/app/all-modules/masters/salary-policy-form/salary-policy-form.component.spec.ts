import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPolicyFormComponent } from './salary-policy-form.component';

describe('SalaryPolicyFormComponent', () => {
  let component: SalaryPolicyFormComponent;
  let fixture: ComponentFixture<SalaryPolicyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryPolicyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPolicyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
