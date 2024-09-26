import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialNonWorkingDayComponent } from './special-non-working-day.component';

describe('SpecialNonWorkingDayComponent', () => {
  let component: SpecialNonWorkingDayComponent;
  let fixture: ComponentFixture<SpecialNonWorkingDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialNonWorkingDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialNonWorkingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
