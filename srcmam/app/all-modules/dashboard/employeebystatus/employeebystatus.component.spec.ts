import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeebystatusComponent } from './employeebystatus.component';

describe('EmployeebystatusComponent', () => {
  let component: EmployeebystatusComponent;
  let fixture: ComponentFixture<EmployeebystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeebystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeebystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
