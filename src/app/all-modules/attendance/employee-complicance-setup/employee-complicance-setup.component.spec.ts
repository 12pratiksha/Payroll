import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComplicanceSetupComponent } from './employee-complicance-setup.component';

describe('EmployeeComplicanceSetupComponent', () => {
  let component: EmployeeComplicanceSetupComponent;
  let fixture: ComponentFixture<EmployeeComplicanceSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeComplicanceSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComplicanceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
