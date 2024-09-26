import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialWorkingDayUpdateComponent } from './special-working-day-update.component';

describe('SpecialWorkingDayUpdateComponent', () => {
  let component: SpecialWorkingDayUpdateComponent;
  let fixture: ComponentFixture<SpecialWorkingDayUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialWorkingDayUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialWorkingDayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
