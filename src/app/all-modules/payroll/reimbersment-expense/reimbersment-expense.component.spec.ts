import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbersmentExpenseComponent } from './reimbersment-expense.component';

describe('ReimbersmentExpenseComponent', () => {
  let component: ReimbersmentExpenseComponent;
  let fixture: ComponentFixture<ReimbersmentExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbersmentExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbersmentExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
