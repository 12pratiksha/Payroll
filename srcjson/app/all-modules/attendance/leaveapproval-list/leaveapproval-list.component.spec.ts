import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapprovalListComponent } from './leaveapproval-list.component';

describe('LeaveapprovalListComponent', () => {
  let component: LeaveapprovalListComponent;
  let fixture: ComponentFixture<LeaveapprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveapprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
