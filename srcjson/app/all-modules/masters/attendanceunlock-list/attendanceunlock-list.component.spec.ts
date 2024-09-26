import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceunlockListComponent } from './attendanceunlock-list.component';

describe('AttendanceunlockListComponent', () => {
  let component: AttendanceunlockListComponent;
  let fixture: ComponentFixture<AttendanceunlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceunlockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceunlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
