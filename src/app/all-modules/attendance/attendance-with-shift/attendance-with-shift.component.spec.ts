import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceWithShiftComponent } from './attendance-with-shift.component';

describe('AttendanceWithShiftComponent', () => {
  let component: AttendanceWithShiftComponent;
  let fixture: ComponentFixture<AttendanceWithShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceWithShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceWithShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
