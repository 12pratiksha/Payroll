import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyDeparturePlanListComponent } from './early-departure-plan-list.component';

describe('EarlyDeparturePlanListComponent', () => {
  let component: EarlyDeparturePlanListComponent;
  let fixture: ComponentFixture<EarlyDeparturePlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarlyDeparturePlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlyDeparturePlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
