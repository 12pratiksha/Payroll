import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbersmentExpenseFormComponent } from './reimbersment-expense-form.component';

describe('ReimbersmentExpenseFormComponent', () => {
  let component: ReimbersmentExpenseFormComponent;
  let fixture: ComponentFixture<ReimbersmentExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbersmentExpenseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbersmentExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
