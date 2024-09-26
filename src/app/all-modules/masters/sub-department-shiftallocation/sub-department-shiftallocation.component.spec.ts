import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentShiftallocationComponent } from './sub-department-shiftallocation.component';

describe('SubDepartmentShiftallocationComponent', () => {
  let component: SubDepartmentShiftallocationComponent;
  let fixture: ComponentFixture<SubDepartmentShiftallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDepartmentShiftallocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentShiftallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
