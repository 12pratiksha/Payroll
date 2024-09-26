import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceAmountForExpensesComponent } from './advance-amount-for-expenses.component';

describe('AdvanceAmountForExpensesComponent', () => {
  let component: AdvanceAmountForExpensesComponent;
  let fixture: ComponentFixture<AdvanceAmountForExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceAmountForExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceAmountForExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
