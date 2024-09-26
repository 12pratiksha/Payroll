import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateDeductionHistoryComponent } from './late-deduction-history.component';

describe('LateDeductionHistoryComponent', () => {
  let component: LateDeductionHistoryComponent;
  let fixture: ComponentFixture<LateDeductionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateDeductionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateDeductionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
