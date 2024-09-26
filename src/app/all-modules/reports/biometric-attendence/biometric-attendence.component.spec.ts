import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricAttendenceComponent } from './biometric-attendence.component';

describe('BiometricAttendenceComponent', () => {
  let component: BiometricAttendenceComponent;
  let fixture: ComponentFixture<BiometricAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiometricAttendenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
