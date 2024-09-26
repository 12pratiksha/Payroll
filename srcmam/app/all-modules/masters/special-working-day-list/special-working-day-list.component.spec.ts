import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialWorkingDayListComponent } from './special-working-day-list.component';

describe('SpecialWorkingDayListComponent', () => {
  let component: SpecialWorkingDayListComponent;
  let fixture: ComponentFixture<SpecialWorkingDayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialWorkingDayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialWorkingDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
