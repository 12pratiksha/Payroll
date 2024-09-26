import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMasterEditFormwithIdComponent } from './employee-master-edit-formwith-id.component';

describe('EmployeeMasterEditFormwithIdComponent', () => {
  let component: EmployeeMasterEditFormwithIdComponent;
  let fixture: ComponentFixture<EmployeeMasterEditFormwithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMasterEditFormwithIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMasterEditFormwithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
