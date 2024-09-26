import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMasterEditFormComponent } from './employee-master-edit-form.component';

describe('EmployeeMasterEditFormComponent', () => {
  let component: EmployeeMasterEditFormComponent;
  let fixture: ComponentFixture<EmployeeMasterEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMasterEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMasterEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
