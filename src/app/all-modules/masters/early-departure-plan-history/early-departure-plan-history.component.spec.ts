import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyDeparturePlanHistoryComponent } from './early-departure-plan-history.component';

describe('EarlyDeparturePlanHistoryComponent', () => {
  let component: EarlyDeparturePlanHistoryComponent;
  let fixture: ComponentFixture<EarlyDeparturePlanHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarlyDeparturePlanHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlyDeparturePlanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
