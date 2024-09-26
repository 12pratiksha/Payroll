import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportmonthlyAttendanceComponent } from './importmonthly-attendance.component';

describe('ImportmonthlyAttendanceComponent', () => {
  let component: ImportmonthlyAttendanceComponent;
  let fixture: ComponentFixture<ImportmonthlyAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportmonthlyAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportmonthlyAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
