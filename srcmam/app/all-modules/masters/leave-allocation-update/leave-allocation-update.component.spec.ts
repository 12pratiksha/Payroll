import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAllocationUpdateComponent } from './leave-allocation-update.component';

describe('LeaveAllocationUpdateComponent', () => {
  let component: LeaveAllocationUpdateComponent;
  let fixture: ComponentFixture<LeaveAllocationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAllocationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAllocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
