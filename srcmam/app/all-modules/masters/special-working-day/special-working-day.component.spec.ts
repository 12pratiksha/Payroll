import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialWorkingDayComponent } from './special-working-day.component';

describe('SpecialWorkingDayComponent', () => {
  let component: SpecialWorkingDayComponent;
  let fixture: ComponentFixture<SpecialWorkingDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialWorkingDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialWorkingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
