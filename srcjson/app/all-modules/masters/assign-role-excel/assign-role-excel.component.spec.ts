import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoleExcelComponent } from './assign-role-excel.component';

describe('AssignRoleExcelComponent', () => {
  let component: AssignRoleExcelComponent;
  let fixture: ComponentFixture<AssignRoleExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRoleExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRoleExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
