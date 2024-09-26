import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceAmountForExpensesFormComponent } from './advance-amount-for-expenses-form.component';

describe('AdvanceAmountForExpensesFormComponent', () => {
  let component: AdvanceAmountForExpensesFormComponent;
  let fixture: ComponentFixture<AdvanceAmountForExpensesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceAmountForExpensesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceAmountForExpensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
