import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeShiftComponent } from './assign-employee-shift.component';

describe('AssignEmployeeShiftComponent', () => {
  let component: AssignEmployeeShiftComponent;
  let fixture: ComponentFixture<AssignEmployeeShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEmployeeShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEmployeeShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
