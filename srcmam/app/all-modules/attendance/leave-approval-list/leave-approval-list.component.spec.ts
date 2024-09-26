import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalListComponent } from './leave-approval-list.component';

describe('LeaveApprovalListComponent', () => {
  let component: LeaveApprovalListComponent;
  let fixture: ComponentFixture<LeaveApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
