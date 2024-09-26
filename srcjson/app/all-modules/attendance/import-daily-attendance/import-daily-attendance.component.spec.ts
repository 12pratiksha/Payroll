import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDailyAttendanceComponent } from './import-daily-attendance.component';

describe('ImportDailyAttendanceComponent', () => {
  let component: ImportDailyAttendanceComponent;
  let fixture: ComponentFixture<ImportDailyAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDailyAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDailyAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
