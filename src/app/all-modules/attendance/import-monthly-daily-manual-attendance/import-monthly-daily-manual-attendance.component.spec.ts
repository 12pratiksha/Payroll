import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMonthlyDailyManualAttendanceComponent } from './import-monthly-daily-manual-attendance.component';

describe('ImportMonthlyDailyManualAttendanceComponent', () => {
  let component: ImportMonthlyDailyManualAttendanceComponent;
  let fixture: ComponentFixture<ImportMonthlyDailyManualAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMonthlyDailyManualAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMonthlyDailyManualAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
