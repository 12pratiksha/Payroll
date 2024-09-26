import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateDeductionPlanComponent } from './late-deduction-plan.component';

describe('LateDeductionPlanComponent', () => {
  let component: LateDeductionPlanComponent;
  let fixture: ComponentFixture<LateDeductionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateDeductionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateDeductionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
