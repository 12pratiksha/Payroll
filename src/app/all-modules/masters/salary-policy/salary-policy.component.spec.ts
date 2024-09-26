import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPolicyComponent } from './salary-policy.component';

describe('SalaryPolicyComponent', () => {
  let component: SalaryPolicyComponent;
  let fixture: ComponentFixture<SalaryPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
