import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLockListComponent } from './attendance-lock-list.component';

describe('AttendanceLockListComponent', () => {
  let component: AttendanceLockListComponent;
  let fixture: ComponentFixture<AttendanceLockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceLockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceLockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
