import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAllocationComponent } from './leave-allocation.component';

describe('LeaveAllocationComponent', () => {
  let component: LeaveAllocationComponent;
  let fixture: ComponentFixture<LeaveAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
