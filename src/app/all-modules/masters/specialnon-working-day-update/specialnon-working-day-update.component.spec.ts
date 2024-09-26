import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialnonWorkingDayUpdateComponent } from './specialnon-working-day-update.component';

describe('SpecialnonWorkingDayUpdateComponent', () => {
  let component: SpecialnonWorkingDayUpdateComponent;
  let fixture: ComponentFixture<SpecialnonWorkingDayUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialnonWorkingDayUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialnonWorkingDayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
