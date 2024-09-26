import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateDeparturePlanComponent } from './late-departure-plan.component';

describe('LateDeparturePlanComponent', () => {
  let component: LateDeparturePlanComponent;
  let fixture: ComponentFixture<LateDeparturePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateDeparturePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateDeparturePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
